const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BPM API",
      version: "1.0.0",
      description: "API documentation for BPM app",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["full_name"],
          properties: {
            full_name: {
              type: "string",
              description: "Full user name, at least two letters and two words (first and last name)",
            },
          },
          example: {
            full_name: "Shmuel Atar",
          },
        },
        Measure: {
          type: "object",
          required: ["user_id","syst_high","dias_low","pulse"],
          
          properties: {
            user_id: {
              type: "int",
              description: "user id that has been measured",
            },
            syst_high: {
              type: "int",
              description: "Systolic (high) measure",
            },
            dias_low: {
              type: "int",
              description: "Diastolic (low) measure",
            },
            pulse: {
              type: "int",
              description: "Heart beats per minute",
            },


          },
          example: {
            syst: 150,
            dias: 110,
            pulse: 55,    
          },
        },
      },
    },
    paths: {
      "/user": {
        post: {
          summary: "Create a new user",
          description: "Create a user by providing their full name.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Shmuel Atar's has been created and stored in rowID: 123.",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid input",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Name is not allowed to be empty, you must provide a name with a minimum of two letters, make sure to provide full name (two words only).",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/measure/{userId}": {
        post: {
          summary: "Create a new measure for a user",
          description: "Create a measure (systolic, diastolic, pulse) for a user.",
          parameters: [
            {
              in: "path",
              name: "userId",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Measure",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Measure created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Measure has been created successfully, Measure ID: 123.",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid input",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Systolic must be provided and needs to be a positive number.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/measure/avg": {
        get: {
          summary: "Get average measure data for all users",
          description: "Get the average systolic, diastolic, and pulse data for all users.",
          responses: {
            "200": {
              description: "Average data retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Avg data found.",
                      },
                      data: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Measure",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./route/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {specs}