import React from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {compose, graphql} from "react-apollo";
import {GET_PROJ_BY_ID,ADD_PROJECT} from '../gql/Query';

class ProjectForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            title:'',
            language:'',
            description:''
        }
    }

    handleChange=(e)=>{
        const {name,value}=e.target;
        this.setState({
            [name]:value
        });
    };

    componentDidMount() {
        debugger
        const {isAddForm,location={},location:{pathname=''},getProjDataById}=this.props;
        let index = Number(pathname.split('/')[2]);
        //getProjDataById.variables.pid=index;
        let data = getProjDataById.getProjById;
        console.log("data----------", data);
        if(!getProjDataById.loading){
            let data = getProjDataById.getProjById;
            console.log("data----------", data);
        }
        //if(index){
            //call method
        //}
        this.setState({isOpen:isAddForm})
    }

    isToggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    saveData = async () => {
        const { saveProduct } = this.props;
        const { title, description,language } = this.state;
        await saveProduct(title, description, language);
        this.isToggle()
    };

    render(){
        const {isOpen,title,description,language} = this.state;
        return(
            <div>
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
                        { /*   <Mutation mutation={ADD_PROJECT}
                                              variables={{title,language,description}}
                                              onCompleted={this.isToggle}
                                              update={(cache, { data: { addProject } }) => {
                                                  let fetchQuery =this.props.query;
                                                  const { allProject } = cache.readQuery({ query: fetchQuery });
                                                  allProject.push(addProject);
                                                  //allProject.unshift(addProject); append in beginning of all records
                                                  cache.writeQuery({
                                                      query: fetchQuery ,
                                                      data: { allProject: allProject },
                                                  });
                                              }}
                    >
                        {
                            saveData => (<Button color={'success'} onClick={saveData}>Save</Button>)
                        }
                    </Mutation>*/}
                        <Button color={'success'} onClick={this.saveData}>Save</Button>
                        <Button color="secondary" onClick={this.isToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

//export default ProjectForm;
const ProjectFormApollo = compose(
    graphql(ADD_PROJECT, { name: "addProject" }),
    graphql(GET_PROJ_BY_ID, { name: "getProjDataById" ,options:{variables:{pid:2}}})
)(ProjectForm);
export default ProjectFormApollo;