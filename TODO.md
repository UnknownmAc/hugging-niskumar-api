# TODO

## Add Tool Calling Support

Add tool/function calling support to the Llama 3.3 70B Instruct API.

### Implementation

1. Accept `tools` array in the request body
2. Pass tools to the model in the API call
3. Handle `tool_calls` in the response
4. Optionally: execute tool calls and return results

### Example Request

```json
{
  "prompt": "What's the weather in Tokyo?",
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get the current weather for a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": { "type": "string", "description": "City name" }
          },
          "required": ["location"]
        }
      }
    }
  ]
}
```

### Example Response with Tool Call

```json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "tool_calls": [{
        "id": "call_123",
        "type": "function",
        "function": {
          "name": "get_weather",
          "arguments": "{\"location\": \"Tokyo\"}"
        }
      }]
    }
  }]
}
```

