using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using ChatApp;
using ChatApp.Contracts;
using MassTransit;

namespace ChatApp;

public class ChatHub : Hub
{
    readonly IBus _bus;

    public ChatHub(IBus bus)
    {
        _bus = bus;
    }
    public async Task Send(string username, string content)
    {
        var message = new Message
        {
            Username = username,
            Content = content
        };
        HistoryBase.list.Add(message);
        await Clients.All.SendAsync("message", username, content);
        await _bus.Publish(message);
    }
}
