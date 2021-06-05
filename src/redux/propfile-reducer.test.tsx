import {addPostCreator, deletePost, ProfilePageType, profileReducer} from "./propfile-reducer";

let state:ProfilePageType

beforeEach(() => {
  state = {
        posts: [
            {id: 1, messages: 'Falcon 9’s first stage has landed on!', likesCount: 11,},
            {id: 2, messages: 'Yuri Gagarin was the first person to fly in space.', likesCount: 41,
            },
        ],
        newPostText: '',
        profile: null,
        status:'Hello!'
    }
})

test('new post should be added', () => {

    // 1. test data
    let action = addPostCreator('new text')


    // 2. action
    let newState = profileReducer(state,action)

    // 3. expectation
    expect( newState.posts.length).toBe(3)
})
test('new post text should be correct', () => {
    let action = addPostCreator('new text')
    let newState = profileReducer(state,action)

    expect( newState.posts[2].messages).toBe('new text')
})
test('post should be deleted', () => {
    let action = deletePost(1)

    let newState = profileReducer(state,action)

    expect( newState.posts.length).toBe(1)
})