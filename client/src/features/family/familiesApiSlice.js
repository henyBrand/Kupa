import apiSlice from "../../app/apiSlice";

const familiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllFamilies: build.query({
            query: () => ({
                url: "/api/family"
            }),
            providesTags: ["Families"]
        }),
        addFamily: build.mutation({
            query: (family) => ({
                url: "/api/family",
                method: "POST",
                body: family
            }),
            invalidatesTags: ["Families"]
        }),
        updateFamily: build.mutation({
            query: (family) => ({
                url: "/api/family",
                method: "PUT",
                body: family
            }),
            invalidatesTags: ["Families"]
        }),
        deleteFamily: build.mutation({
            query: ({ _id }) => ({
                url: "/api/family",
                method: "DELETE",
                body: { _id }
            }),
            invalidatesTags: ["Families"]
        }),
        updateTzFile: build.mutation({
            query: (data) => ({
                url: `/api/family/${data.get("id")}`, // Using FormData to include the ID
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Families"]
        }),
        
    })

})
export const { useGetAllFamiliesQuery, useAddFamilyMutation, useUpdateFamilyMutation, useDeleteFamilyMutation ,useUpdateTzFileMutation} = familiesApiSlice