import  {createStore as _createStore,Store} from 'vuex';

export interface State{
    about:string[];
    lick:string[]
}
export function createStore(){
    const store= _createStore({
        state:{
            about:[],
            like:[]
        },
        mutations:{
            SET_DATA_ABOUT(state,payload){
                state.about = payload
            },
            SET_DATA_LIKE(state,payload){
                state.like = payload
            }
        },
        actions:{
            SET_ASYNC_DATA_ABOUT({commit}){
                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        commit('SET_DATA_ABOUT',[{
                            value:1,
                            label:'bulala'
                        }])
                        resolve(true)
                    },3000)
                })
               
            },
            SET_ASYNC_DATA_LIKE({commit}){
                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        commit('SET_DATA_LIKE',[{
                            value:2,
                            label:'likelike'
                        }])
                        resolve(true)
                    },3000)
                })
               
            },
        }
    })
    return store;
}