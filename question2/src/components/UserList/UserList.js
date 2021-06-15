import React from 'react';
import "./UserList.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const UserList = (props) => {
    const { users } = props;
    if (!users || users.length === 0) return <p>No result found</p>;
    return (
        <div>
            {users.map((userDetails) => {
                return (
                    <div className="row mb-4">
                        <div className="user-avatar col-md-1 col-sm-3" >
                            <img alt="User" className="avatar" src={userDetails.avatar} />
                        </div>
                        <div className="user-detail col-md-11 col-sm-9">
                            <div>
                                {userDetails.first_name + " " + userDetails.last_name}
                            </div>
                            <div>
                                <i class="bi bi-envelope"></i>                                
                                <p className="user-email"><a href={`mailto:${userDetails.email}`}>{userDetails.email}</a></p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default UserList;