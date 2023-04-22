class sessionSchema {
    constructor() {
    username: String;
    password: String;
    createdAt: { 
      type: Date;
      expires: 30;
      date: Date.now();
    };
    }
};

module.export = sessionSchema;