declare global {
    namespace NodeJS {
      interface ProcessEnv {
        ALEXAENDPOINTMANUFACTURERNAME: string;
        ALEXAENDPOINTFRIENDLYNAME: string,
        ALEXAENDPOINTDESCRIPTION: string,
        ALEXACAPABILITYINSTANCE: string,
        WEBTHINGTOKEN: string,
        WEBTHINGSERVERURL: string,
        OKTATOKEN: string,
        NODE_ENV: 'development' | 'production',
        ENCRYPTIONKEY: string,
        DYNAMODBCUSTOMER: string,
        DYNAMODBCOUNT: string,
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}