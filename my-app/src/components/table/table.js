import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { Table, Button, Input } from 'reactstrap';
import './table.css';
import userService from '../../services/user.service';

export default class Profiles extends Component {
    constructor() {
        super();

        this.state = {
            profiles: [],
            isSelected: false
        };

        this.handleChangeAll = this.handleChangeAll.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.unblockProfile = this.unblockProfile.bind(this);
        this.blockProfile = this.blockProfile.bind(this);
    }
   
    renderProfiles() {
        return this.state.profiles.map(profile => {
            return (
                <tr key={profile.id}>
                    <th scope="row">
                        <Input className="input"
                                type="checkbox"
                                onChange={(event) => { this.handleChange(profile.id, event); }}
                                checked={profile.isSelected} />
                    </th>
                    <td>{profile.id}</td>
                    <td>{profile.name}</td>
                    <td>{profile.email}</td>
                    <td>{profile.lastLoginDate}</td>
                    <td>{profile.registrationDate}</td>
                    <td>{this.getStatusText(profile.blocked)}</td>
                </tr>
            );
        });
    }

    getStatusText(status) {
        let text = status ? 'blocked' : 'active';

        return text;
    }

    async componentDidMount() {
        const profiles = await userService.getProfiles();

        this.setState(() => {
            return {
                profiles: profiles.map(profile => {
                    profile.isSelected = false;
                    return profile;
                })
            };
        });
    }

    handleChangeAll (event) {
        let profiles = this.state.profiles;
        profiles.forEach(profile => {
            return profile.isSelected = event.target.checked
        })
        this.setState({profiles: profiles});
    }

    handleChange(profileId, event) {
        let profiles = this.state.profiles;
        profiles.forEach(profile => {
            if (profile.id === profileId) {
                return profile.isSelected = event.target.checked
            }
        })
        this.setState({profiles: profiles});
    }
   
    blockProfile() {
        let profiles = this.state.profiles;
        let profilesForBlock = profiles.filter(profile => {
            if (profile.isSelected) {
                return true;
            } else {
                return false;
            }
        });

        try {
            const result = userService.blockAndUnblockProfiles(profilesForBlock, 'block');
            console.log(result);
            let email = localStorage.getItem('email');
            let currentProfile = profilesForBlock.find(profile => profile.email === email);
            if (currentProfile) {
                return this.setState({redirect: '/login'});
            }
        } catch(error) {
            console.log(error);
        }

        let updatedProfiles = profiles.map(profile => {
            if (profile.isSelected === true) {
                profile.blocked = true;
            }

            return profile;
            });
        this.setState(() => {
            return { profiles: updatedProfiles };   
        });
    }
    
    unblockProfile() {
        let profiles = this.state.profiles;
        let profilesForUnblock = profiles.filter(profile => {
            if (profile.isSelected) {
                return true;
            } else {
                return false;
            }
        });

        try {
            const result = userService.blockAndUnblockProfiles(profilesForUnblock, 'unblock');
            console.log(result);
        } catch(error) {
            console.log(error);
        }

        let updatedProfiles = profiles.map(profile => {
            if (profile.isSelected === true) {
                profile.blocked = false;
            }
            return profile;
        });
        this.setState(() => {
            return { profiles: updatedProfiles };   
        });
    }

    deleteProfile() {
        let profiles = this.state.profiles;
        let profilesForDelete = profiles.filter(profile => {
            if (profile.isSelected) {
                return true;
            } else {
                return false;
            }
        });

        try {
            const result = userService.deleteProfiles(profilesForDelete);
            console.log(result);
            let email = localStorage.getItem('email');
            let currentProfile = profilesForDelete.find(profile => profile.email === email);
            if (currentProfile) {
                return this.setState({redirect: '/login'});
            }
        } catch(error) {
            console.dir(error);
        }

        let profilesForSave = profiles.filter(profile => {
            if (profile.isSelected === false) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({profiles: profilesForSave});
    }
    
    render() {
        let profiles = [];

        if (this.state.profiles.length) {
            profiles = this.renderProfiles()
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h1>Profiles</h1>
                <div>
                    <Button
                    className="btn"
                    onClick={this.blockProfile}
                    outline color="primary">
                    Block
                    </Button>
                    <Button
                    className="btn"
                    onClick={this.unblockProfile}
                    outline color="primary">
                    Unblock
                    </Button>
                    <Button
                    className="btn-trash btn"
                    onClick={this.deleteProfile}
                    outline color="primary">
                        <i className="fa fa-trash"></i>
                    </Button>
                </div>
                <Table>
                    <thead>
                        <tr>
                        <th><Input className="input-all" type="checkbox" onChange={this.handleChangeAll} /></th>
                        <th>id</th> 
                        <th>Name</th>
                        <th>Email</th>
                        <th>Last login date</th>
                        <th>Registration date</th>
                        <th className="status">Status</th>
                        </tr>
                    </thead>
                    <tbody> 
                        { profiles }
                    </tbody>
                </Table>
            </div>
        )
    }
}