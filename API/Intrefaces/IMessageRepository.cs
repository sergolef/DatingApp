using System;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Intrefaces
{
    public interface IMessageRepository
    {
        void AddMessage (Message message);
        void DeleteMessage(Message message);

        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDTO>> GetMessagesForUserAsync(MessageParams messageParams);
        Task<IEnumerable<MessageDTO>> GetMessagesTread(string SenderName, string RecipientName);
        Task<bool> SaveAllAsync();

    }
}

