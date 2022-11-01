using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using ChatApp;

namespace ChatProject
{
    public class ChatHub : Hub
    {
        public async Task Send(string username, string content)
        {
            HistoryBase.list.Add(new History
            {
                Username = username,
                Content = content
            });
            await Clients.All.SendAsync("message", username, content);
        }
    }
}
