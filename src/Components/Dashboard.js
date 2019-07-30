import React from 'react';
import {graphql, compose} from 'react-apollo';
import Display from "./display";
import {GET_PROJECT,ADD_PROJECT} from '../gql/Query';
import {
    Button,
    Navbar,
    NavbarBrand,
} from 'reactstrap';
import ProjectForm from "./projectForm";

/*------------------------------Dashboard Data with Add form on other page imported  --------------------------------------*/

class DashboardWithForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAddForm: false,
            data: [],
            loading: true
        }
    }
    /*componentDidMount() {
        const { getProject } = this.props;
        if(!getProject.loading) {
            console.log("------------------",getProject)
        }
    }*/
    static getDerivedStateFromProps(props, state) {
        const { getProject } = props;
        if(getProject.loading) {
            return { loading: true }
        }
            return { data: getProject.allProject, loading: false}
   }

    isAdd = () => {
        this.setState({isAddForm: !this.state.isAddForm});
    };
    saveProduct = (title, language, description) => {
        const { data } = this.state
        const { addProject } = this.props
        addProject({
            variables: {
                title,
                language,
                description
            }
        }).then((res) => {
          this.setState({
              data: data.push(res.data.addProject)
          })
        })
    }
    render() {
        const {isAddForm, data, loading} = this.state;
        if(loading) {
            return <h2>..... loading</h2>
        }
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/"><p style={{color: 'white'}}>React-Apollo-App</p></NavbarBrand>
                </Navbar>
                <div className={'ml-2 mt-5'}>
                    <Button color={'primary'} onClick={this.isAdd}>
                        Add Project
                    </Button>
                </div>
                <Display data={data}/>
                {
                    isAddForm && <ProjectForm saveProduct={this.saveProduct}  query={GET_PROJECT} isAddForm = {isAddForm}/>
                }

            </div>
        )
    }
};
const DashboardWithFormApollo = compose(
    graphql(ADD_PROJECT, { name: "addProject" }),
    graphql(GET_PROJECT, {name: 'getProject'})
)(DashboardWithForm)
export default DashboardWithFormApollo;