"use server"

const apikey = "askdjfaksjdf"

export async function someAction() {
    console.log("someAction called", apikey);
}

// This console.log() will run on the server (not client/browser) when the action is called, and the apikey will not be exposed to the client.