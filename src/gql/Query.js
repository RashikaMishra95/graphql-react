import gql from "graphql-tag";

export const GET_PROJECT = gql`
    {
        allProject{
            pid
            title
            language
            description
        }
    }`;

export const ADD_PROJECT = gql`
    mutation saveData(
        $title:String!,
        $language:String!,
        $description:String!){
        addProject(
            title:$title,
            language:$language,
            description:$description){
            pid
            title
            language
            description
        }
    }
`;

export const GET_PROJ_BY_ID = gql`
    query($PID:Int){
        getProjById(pid:$PID){
            pid
            title
            language
            description
        }
    }
`;