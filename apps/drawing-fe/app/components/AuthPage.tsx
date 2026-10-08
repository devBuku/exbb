"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm p-6 m-2 bg-white rounded shadow">
        <h1 className="text-xl font-semibold text-center mb-4">
          {isSignin ? "Sign In" : "Sign Up"}
        </h1>
        <Input
          type="text"
          placeholder="email"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        ></Input>
        <Input
          type="password"
          placeholder="password"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        ></Input>
        <Button
          className="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
          onClick={() => {}}
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    </div>
  );
}
