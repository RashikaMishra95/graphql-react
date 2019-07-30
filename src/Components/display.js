import React from 'react';
import {Table,Navbar,NavbarBrand} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class Display extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projData : []
        }
    }

    componentDidMount() {
        const {data} = this.props;
        this.setState({projData:data});
    }

    editData=(id)=>{
        debugger
        this.props.history.push(`/editProj/${id}`);
    };

    render(){
        const {projData} = this.state;
        return(
            <div>
                    <div className={"container mt-5"}>
                        <div className={'row'}>
                            <div className ={'col-lg-12'}>
                                <div className={'d-flex justify-content-center  align-items-center flex-column'}>
                                    <Table striped>
                                            <thead className={'thead-dark'}>
                                            <tr>
                                                <th>Pid</th>
                                                <th>Title</th>
                                                <th>Language</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                        <tbody>
                                        {
                                            projData.map((p,index)=>
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{p.title}</td>
                                                    <td>{p.language}</td>
                                                    <td>{p.description}</td>
                                                    <td><i className="fa fa-pencil"
                                                           onClick={()=>{this.editData(p.pid)}}
                                                        />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <i className="fa fa-trash"  />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default withRouter(Display);