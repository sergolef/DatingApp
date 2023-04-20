using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Intrefaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        public MessagesController(IUserRepository userRepository, IMessageRepository messageRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _messageRepository = messageRepository;
            _mapper = mapper;
        }

        public IUserRepository _userRepository { get; }
        public IMessageRepository _messageRepository { get; }
        public IMapper _mapper;

        [HttpPost]
        public async Task<ActionResult<MessageDTO>> CreateMessage(CreateMessageDTO createMessageDTO)
        {
            var username = User.GetUsername();

            if(createMessageDTO.RecipientName == username)
            {
                return BadRequest("You can't sent message for yourself");
            }

            var sender = await _userRepository.GetUserByNameAsync(username);
            var recipient = await _userRepository.GetUserByNameAsync(createMessageDTO.RecipientName);

            if (recipient == null) return NotFound("Resipient not found");

            var newMessage = new Message
            {
                Sender = sender,
                SenderName = sender.UserName,
                Recipient = recipient,
                RecipientName = recipient.UserName,
                RecipientId = recipient.Id,
                SenderId = sender.Id,
                Content = createMessageDTO.Content
            };

            _messageRepository.AddMessage(newMessage);

            if (await _messageRepository.SaveAllAsync()) return Ok(_mapper.Map<MessageDTO>(newMessage));

            return BadRequest("Failed message creation");
            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessages([FromQuery] MessageParams pagedParams)
        {
            var username = User.GetUsername();

            var user = await _userRepository.GetUserByNameAsync(username);
           


            pagedParams.Container = (pagedParams.Container != null) ? pagedParams.Container : "unread";
            pagedParams.Username = username;

            var messages = await this._messageRepository.GetMessagesForUserAsync(pagedParams);
            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);


            return Ok(messages);
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetThread(string username)
        {
            var cuser = User.GetUsername();
            var treads = await _messageRepository.GetMessagesTread(cuser, username);

            return Ok(treads);
        }
    }
}


