import React, {Component, useEffect, useRef, useState} from 'react';
import * as signalR from "@microsoft/signalr";
import {Input} from "reactstrap";

let connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5012/chat")
    .build();

connection.start();

export function Chat() {
    const [messages, setMessages] = useState([]);
    const usernameRef = useRef();
    useEffect(() => {
        fetch("http://localhost:5012/history")
            .then(r => r.json())
            .then(r => setMessages(r))
    }, [])
    useEffect(() => {
        const onMessage = (username, message) => {
            setMessages([...messages, {username: username, content: message}]);
        };
        connection.on("message", onMessage);
        
        return () => {
            connection.off("message");
        }
    }, [messages])
    return (
        <div>
            <h1>Chat app</h1>
            <div className="chat">
                {messages.map((message, index) => (
                    <div className="card p-2 mt-2 mb-2" key={index}>
                        <b>{message.username}</b>
                        <p>{message.content}</p>
                    </div>
                ))}
                <input
                    className="form-control mb-2"
                    placeholder="Имя"
                    ref={usernameRef}
                />
                <input
                    className="form-control"
                    placeholder="Введите сообщение"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            console.log("sending");
                            connection.invoke("Send", usernameRef.current.value, e.currentTarget.value);
                        }
                    }}
                />
            </div>
        </div>
    );
}
