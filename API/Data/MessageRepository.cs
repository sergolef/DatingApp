using System;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Intrefaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository : IMessageRepository 
    {
        private readonly DataContext context;
        private readonly IMapper _mapper;

        public MessageRepository(DataContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
        }

        public void AddMessage(Message message)
        {
            this.context.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            this.context.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDTO>> GetMessagesForUserAsync(MessageParams messageParams)
        {
            var query = context.Messages
                .OrderBy(u => u.SentDate)
                .AsQueryable();

            

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.UserName == messageParams.Username),
                "Outbox" => query.Where(u => u.Sender.UserName == messageParams.Username),
                _ => query.Where(u => u.Recipient.UserName == messageParams.Username && u.ReadDate == null)
            };
            
            return await PagedList<MessageDTO>.ToPagedListAsync(
                query.ProjectTo<MessageDTO>(_mapper.ConfigurationProvider).AsNoTracking(),
                messageParams.PageNumber,
                messageParams.PageSize
            );
        }

        public async Task<IEnumerable<MessageDTO>> GetMessagesTread(string SenderName, string RecipientName)
        {
            var messages = await context.Messages
                .Include(s => s.Sender).ThenInclude(p => p.Photos)
                .Include(s => s.Recipient).ThenInclude(p => p.Photos)
                .Where(u => u.Recipient.UserName == SenderName && u.Sender.UserName == RecipientName ||
            u.Recipient.UserName == RecipientName && u.Sender.UserName == SenderName)
                .OrderBy(o => o.SentDate)
                .ToListAsync();

            var unreadMessages = await context.Messages
                .Where(u => u.ReadDate == null && u.RecipientName == RecipientName)
                .ToListAsync();

            if (unreadMessages.Any())
            {
                foreach (var item in unreadMessages)
                {
                    item.ReadDate = DateTime.Now;
                }
            }
            await context.SaveChangesAsync();

            return _mapper.Map<IEnumerable<MessageDTO>>(messages);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}

