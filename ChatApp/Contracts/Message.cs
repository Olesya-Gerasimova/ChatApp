namespace ChatApp.Contracts;

public record Message
{
    public string Username { get; init; }
    public string Content { get; init; }
}
