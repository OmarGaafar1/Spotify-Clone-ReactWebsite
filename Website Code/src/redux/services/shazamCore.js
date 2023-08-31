import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const shazamCoreApi= createApi({
    reducerPath:'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam.p.rapidapi.com',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key', '0a505ffe1cmsh1e63e8833d2e129p1a86b6jsnb5a983037da4')
            return headers
        }
    })
    ,
   endpoints: (builder) => ({
  getTopCharts: builder.query({
    query: () => '/charts/track', // Provide the endpoint URL here
  }),
}),
});


export const {
    useGetTopChartsQuery,
}  = shazamCoreApi;
