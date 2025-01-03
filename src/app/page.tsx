"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatParent = useRef<HTMLUListElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  return (
    <main className="flex flex-col w-full h-screen max-h-dvh bg-background">
      <header className="flex justify-between p-4 border-b w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">AI Chat</h1>
        <h1>
          <ModeToggle />
        </h1>
      </header>

      <section className="p-4">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-3xl mx-auto items-center"
        >
          <Input
            className="flex-1 min-h-[40px]"
            placeholder="Type your question here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="ml-2" type="submit">
            Submit
          </Button>
        </form>
      </section>

      <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
        <ul
          ref={chatParent}
          className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4"
        >
          {messages.map((m, index) => (
            <>
              {m.role === "user" ? (
                <li key={index} className="flex flex-row">
                  <div className="rounded-xl p-4 bg-background shadow-md flex">
                    <p className="text-primary">{m.content}</p>
                  </div>
                </li>
              ) : (
                <li key={index} className="flex flex-row-reverse">
                  <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                    <p className="text-primary">
                      <span className="font-bold">Answer: </span>
                      {m.content}
                    </p>
                  </div>
                </li>
              )}
            </>
          ))}
        </ul>
      </section>
      <footer className="flex justify-between pt-0 px-4 pb-4 border-b w-full max-w-3xl mx-auto">
        <div>{currentYear}&copy;All Rights Reserved</div>
        <div>
          Build by&nbsp; <span className="font-bold">Zitu Hoque</span>
        </div>
      </footer>
    </main>
  );
}
