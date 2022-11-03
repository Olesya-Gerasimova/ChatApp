using ChatApp.Contracts;
using MassTransit;

namespace ChatApp.Consumers;

public class MessageConsumer :
    IConsumer<Message>
{
    public async Task Consume(ConsumeContext<Message> context)
    {
        //await context.Publish(context);
        // add entity framework add there
    }
}
