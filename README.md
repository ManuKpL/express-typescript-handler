# Express typescript handler

Typescript and express aren't the best of friends.

1. We can restrict the type of our request handlers to match the actual data available in the request object but express routers won't accept restricted types.
2. Most of the use case restricting the type of requests are handled on runtime by validation middleware but the information is lost when the request triggers the next request handler.

Using zod as a base to link validation and type definition, this project aims to explore the possibilities of declaring validation middlewares and request handlers (controllers) in a combine way, i.e. without having to cast types in several places.
