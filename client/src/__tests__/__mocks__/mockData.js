export default ({
  members: [
    {
      id: 1,
      email: 'snapemarshal@blue.com',
      username: 'hermione',
    }
  ],
  nonMembers: {
    users: [
      {
        id: 2,
        email: 'estelle@gmail.com',
        username: 'estelle',
      }
    ],
    pagination: {
      page: 1,
      pageCount: 1,
      pageSize: 2,
      totalCount: 2
    }
  },
  search: {
    searchTerm: 'a',
    group: 1,
    limit: 1,
    offset: 1
  },
  group: {
    id: 1,
    name: 'Second group Ever'
  },
  groups: [
    {
      id: 1,
      name: 'Team Matterhorn'
    },
    {
      id: 2,
      name: 'Music Bandits'
    }
  ],
  userDetail: {
    userId: 2
  },
  resetToken: 'TjDkmRh3mYTayaN2NKBWUrtmG4',
  email: 'user@gmail.com',
  password: 'graphyl09',
  messages: [
    {
      id: 1,
      content: 'My first Message',
      priority: 'Normal',
    },
    {
      id: 2,
      content: 'My second Message',
      priority: 'Normal',
    }
  ],
  message: {
    id: 1,
    senderId: 3,
    content: 'Welcome to Team Everest',
    priority: 'Normal'
  },
  authResponse: {
    message: 'Successful!',
    user: {
      id: 1,
      name: 'hermione',
      email: 'snapemarshal@blue.com'
    },
    token: 'eyJhbGci.I6MQ0fQ.mqnk8I'
  }
});
