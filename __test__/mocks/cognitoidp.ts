import AWS from "aws-sdk";

type UserItem = {
  username: string;
  email?: string;
  sub?: string;
};

type Req = AWS.CognitoIdentityServiceProvider.ListUsersRequest;
type Res = AWS.CognitoIdentityServiceProvider.ListUsersResponse;

// Mock
const registerMock = (users: UserItem[], query: "email" | "sub") => {
  // @ts-ignore
  AWS.CognitoIdentityServiceProvider = class MockCognitoIdp {
    _listUsersByEmail = (param: Req) => ({
      promise: () => {
        const { Filter = "" } = param;
        const match = Filter.match(/^email = "(.+)"$/);
        const email = match ? match[1] : "";
        return Promise.resolve<Res>({
          Users: users
            .filter(user => user.email === email)
            .map(user => ({ Username: user.username }))
        });
      }
    });

    _listUsersBySub = (param: Req) => ({
      promise: () => {
        const { Filter = "" } = param;
        const match = Filter.match(/^sub = "(.+)"$/);
        const sub = match ? match[1] : "";
        return Promise.resolve<Res>({
          Users: users
            .filter(user => user.sub === sub)
            .map(user => ({ Username: user.username }))
        });
      }
    });

    listUsers =
      query === "email"
        ? this._listUsersByEmail
        : query === "sub"
        ? this._listUsersBySub
        : void 0;
  };
};

export default registerMock;
