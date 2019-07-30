import React from 'react';
import {Query, Mutation, compose, graphql} from 'react-apollo';
import  gql from 'graphql-tag';
import Display from "./display";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Navbar,
    NavbarBrand,
    Form,
    FormGroup,
    Label, Input
} from 'reactstrap';

/*------------------------------DashboardWithForm Data with Add form on same page  --------------------------------------*/
const GET_PROJECT = gql`
  {
    allProject{
      pid
      title
      language
      description
    }
  }`;

const ADD_PROJECT = gql`
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

class DashboardWithForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            title:'',
            language:'',
            description:''
        }
    }

    isToggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    handleChange=(e)=>{
        const {name,value}=e.target;
        this.setState({
            [name]:value
        });
    };

    render() {
        const {isOpen,title,description,language} = this.state;
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/"><p style={{color: 'white'}}>React-Apollo-App</p></NavbarBrand>
                </Navbar>
                <div className={'ml-2 mt-5'}>
                    <Button color={'primary'} onClick={this.isToggle}>
                        Add Project
                    </Button>
                </div>
                <Query query={GET_PROJECT}>
                    {({loading, error, data}) => {
                        if (loading) return <h2>Loading...</h2>;
                        if (error) return <h2>Error</h2>;
                        return <Display data={data}/>
                    }}
                </Query>
                <Modal isOpen={isOpen} toggle={this.isToggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add Project</ModalHeader>
                    <ModalBody>
                        <div>
                            <Form>
                                <FormGroup>
                                    <Label>Title:</Label>
                                    <Input type="text"
                                           name="title"
                                           id="title"
                                           value={title}
                                           onChange={(e)=>{this.handleChange(e)}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Language:</Label>
                                    <Input type="text"
                                           name="language"
                                           id="language"
                                           value={language}
                                           onChange={(e)=>{this.handleChange(e)}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Description:</Label>
                                    <Input type="text"
                                           name="description"
                                           id="description"
                                           value={description}
                                           onChange={(e)=>{this.handleChange(e)}}
                                    />
                                </FormGroup>
                            </Form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Mutation mutation={ADD_PROJECT}
                                  variables={{title,language,description}}
                                  onCompleted={this.isToggle}
                                  update={(cache, { data: { addProject } }) => {
                                      const { allProject } = cache.readQuery({ query: GET_PROJECT });
                                      allProject.push(addProject);
                                      //allProject.unshift(addProject); append in beginning of all records
                                      cache.writeQuery({
                                          query: GET_PROJECT,
                                          data: { allProject: allProject },
                                      });
                                  }}
                        >
                            {
                                saveData => (<Button color={'success'} onClick={saveData}>Save</Button>)
                            }
                        </Mutation>
                        <Button color="secondary" onClick={this.isToggle}>Cancel</Button>
                    </ModalFooter>
            </Modal>
            </div>
        )
    }
};
const DashboardWithFormApollo = compose(
    graphql(ADD_PROJECT, { name: "addProject" })
)(DashboardWithForm)
export default DashboardWithFormApollo;