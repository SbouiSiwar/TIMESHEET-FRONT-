import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  retrieveProjects,
  deleteProject,
  updateProject,
  createProject,
  retrieveProjectsByTitle,
} from "../slices/projects";
import {
  retrieveProjectMembers,
  retrieveAvailableMembers,
  addMember,
  deleteMember,
} from "../slices/members";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "react-modal";
import MaterialTable from "material-table";
import { AddBox, ArrowDownward } from "@material-ui/icons";

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      titre: "",
      descreption: "",
      dateDebut: "",
      dateFin: "",
      currentProject: 0,
      IsOpen: false,
      membersOpen: false,
    };

    Modal.setAppElement("body");
  }

  openModal() {
    this.setState({ IsOpen: true });
    document.body.style.overflow = "hidden";
    document.body.classList.add("no-scroll");
  }

  closeModal() {
    this.setState({ IsOpen: false });
    this.clearData();
  }
  closeMembersModal() {
    this.setState({ membersOpen: false });
    this.props.retrieveProjectMembers({ id: this.state.currentProject });
  }
  componentDidMount() {
    this.props.retrieveProjects();
    this.props.retrieveProjectMembers({ id: this.state.currentProject });
  }
  submitData = () => {
    if (
      this.state.titre &&
      this.state.descreption &&
      this.state.dateDebut &&
      this.state.dateFin &&
      !this.state.id
    ) {
      const newProject = {
        titre: this.state.titre,
        descreption: this.state.descreption,
        dateDebut: this.state.dateDebut,
        dateFin: this.state.dateFin,
      };

      this.props.createProject(newProject);
      this.closeModal();
    } else if (this.state.titre && this.state.descreption) {
      const updatedDetails = {
        id: this.state.id,
        titre: this.state.titre,
        descreption: this.state.descreption,
        dateDebut: this.state.dateDebut,
        dateFin: this.state.dateFin,
      };

      this.props.updateProject({
        id: this.state.id,
        data: updatedDetails,
      });
      this.closeModal();
    } else {
      alert("Enter project Details.");
    }
    this.clearData();
  };
  editDetails = (data) => {
    this.setState({
      id: data.id,
      titre: data.titre,
      descreption: data.descreption,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin,
      IsOpen: true,
    });
  };
  onChangeTitre = (e) => {
    this.setState({
      titre: e.target.value,
    });
  };
  onChangeDescreption = (e) => {
    this.setState({
      descreption: e.target.value,
    });
  };
  onChangeDateDebut = (e) => {
    this.setState({
      dateDebut: e.target.value,
    });
  };
  onChangeDateFin = (e) => {
    this.setState({
      dateFin: e.target.value,
    });
  };
  clearData = () => {
    this.setState({
      id: 0,
      titre: "",
      descreption: "",
      dateDebut: "",
      dateFin: "",
    });
  };
  delete = (id) => {
    this.props.deleteProject({ id });
  };
  deleteMember = (id) => {
    this.props.deleteMember({ idp: this.state.currentProject, idu: id });
  };

  setActiveProject(index) {
    this.setState({ currentProject: index });
    this.props.retrieveProjectMembers({ id: index });
  }

  availableList() {
    this.props.retrieveAvailableMembers({ id: this.state.currentProject });
    this.setState({
      membersOpen: true,
    });
  }
  addMember(id) {
    this.props.addMember({ id: this.state.currentProject, data: id });
  }
  ResetActiveProject() {
    this.setState({ currentProject: 0 });
  }
  render() {
    const { searchTitle, currentIndex, currentProject } = this.state;
    const project = this.props.projects;
    const clone = JSON.parse(JSON.stringify(this.props.projects));
    const members = JSON.parse(JSON.stringify(this.props.members));
    document.body.style.overflow = "hidden";
    const comonscol = [
      { title: "Titre", field: "titre" },
      { title: "Descreption", field: "descreption" },
      { title: "DateDebut", field: "dateDebut" },
      { title: "DateFin", field: "dateFin" },
    ];
    const comonscol2 = [
      { title: "Nom", field: "nom" },
      { title: "Prenom", field: "prenom" },
    ];

    return (
      <html>
        <body>
          <div className="App ">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />

            <div className="col-md-12 m-auto grid-margin stretch-card">
              <div className="card">
                <MaterialTable
                  title="Projetcs"
                  columns={comonscol}
                  data={clone}
                  options={{
                    toolbar: true,
                    showHeader: false,
                    exportButton: true,
                    exportAllData: true,
                    actionsColumnIndex: 4,
                    headerStyle: {
                      backgroundColor: "#181c24",
                      color: "#FFF",
                      maxBodyHeight: "height - 48",
                      select: {
                        color: "green",
                        fontSize: "20px",
                      },
                    },
                  }}
                  components={{
                    Container: (props) => (
                      <table className="table" {...props} />
                    ),
                  }}
                  actions={[
                    {
                      icon: () => (
                        <button className="btn btn-primary btn-rounded btn-fw">
                          Edit
                        </button>
                      ),

                      onClick: (e, clone) => this.editDetails(clone),
                    },
                    {
                      icon: () => (
                        <button className="btn btn-danger btn-rounded btn-fw">
                          Delete
                        </button>
                      ),

                      onClick: (e, clone) => this.delete(clone.id),
                    },
                    {
                      icon: () => (
                        <button className="btn btn-info btn-rounded  btn-fw">
                          Members
                        </button>
                      ),

                      onClick: (e, clone) => this.setActiveProject(clone.id),
                    },
                    {
                      icon: () => (
                        <button className="btn btn-primary float-right">
                          Add
                        </button>
                      ),

                      onClick: () => this.openModal(),
                      isFreeAction: true,
                    },
                  ]}
                />
              </div>
            </div>

            <Modal
              style={{ overflow: "hidden", position: "fixed" }}
              isOpen={this.state.IsOpen}
              className="Modal-content body-modal-open-hidden "
            >
              <br /> <br />
              <br /> <br />
              <br /> <br />
              <br /> <br />
              <br /> <br />
              <div className="col-md-6 m-auto grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <button
                      style={{ float: "right" }}
                      onClick={() => this.closeModal()}
                      className="btn btn-danger "
                    >
                      {" "}
                      X
                    </button>
                    <br /> Titre:{" "}
                    <input
                      class="form-control"
                      onChange={this.onChangeTitre}
                      value={this.state.titre}
                      type="text"
                      placeholder="titre"
                    />{" "}
                    <br />
                    Descreption :{" "}
                    <input
                      class="form-control"
                      onChange={this.onChangeDescreption}
                      value={this.state.descreption}
                      type="text"
                      placeholder="Descreption"
                    />
                    <br />
                    DateDebut:{" "}
                    <input
                      class="form-control"
                      onChange={this.onChangeDateDebut}
                      value={this.state.dateDebut}
                      type="date"
                    />{" "}
                    <br />
                    DateFin:{" "}
                    <input
                      class="form-control"
                      onChange={this.onChangeDateFin}
                      value={this.state.dateFin}
                      type="date"
                    />{" "}
                    <br />
                    {this.state.id ? (
                      <button
                        class="btn btn-primary me-2"
                        onClick={this.submitData}
                      >
                        UPDATE
                      </button>
                    ) : (
                      <button
                        class="btn btn-primary me-2"
                        onClick={this.submitData}
                      >
                        ADD
                      </button>
                    )}
                    {this.state.id < 1 && (
                      <button
                        class="btn btn-dark btn-icon-text mdi mdi-reload btn-icon-prepend"
                        onClick={this.clearData}
                      >
                        CLEAR
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Modal>
            <br />
            <br />
            <br />
            {this.state.currentProject > 0 && (
              <>
                <br /> <br />
                <br /> <br />
                <div className="col-md-11 m-auto grid-margin stretch-card">
                  <div className="card">
                    <MaterialTable
                      title="Members"
                      columns={comonscol2}
                      data={members}
                      options={{
                        exportButton: true,
                        exportAllData: true,
                        actionsColumnIndex: 4,
                        headerStyle: {
                          backgroundColor: "#181c24",
                          color: "#FFF",
                        },
                      }}
                      components={{
                        Container: (props) => (
                          <table className="table" {...props} />
                        ),
                      }}
                      actions={[
                        {
                          icon: () => (
                            <button className="btn btn-danger  btn-rounded btn-fw">
                              Remove
                            </button>
                          ),

                          onClick: (e, members) =>
                            this.deleteMember(members.id),
                        },

                        {
                          icon: () => (
                            <button className="btn btn-primary float-right">
                              Add
                            </button>
                          ),

                          onClick: () => this.availableList(),
                          isFreeAction: true,
                        },
                        {
                          icon: () => (
                            <button className="btn btn-danger  float-right">
                              X
                            </button>
                          ),

                          onClick: () => this.ResetActiveProject(),
                          isFreeAction: true,
                        },
                      ]}
                    />
                  </div>
                </div>
                <br />
              </>
            )}

            <Modal isOpen={this.state.membersOpen} className="Modal">
              <br /> <br />
              <br /> <br />
              <br /> <br />
              <br /> <br />
              <br /> <br />
              <div className="col-md-6 m-auto grid-margin stretch-card">
                <div className="card">
                  <MaterialTable
                    title="Members"
                    columns={comonscol2}
                    data={members}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      actionsColumnIndex: 4,
                      headerStyle: {
                        backgroundColor: "#181c24",
                        color: "#FFF",
                        index: "10",
                      },
                    }}
                    components={{
                      Container: (props) => (
                        <table className="table" {...props} />
                      ),
                    }}
                    actions={[
                      {
                        icon: () => (
                          <button className="btn btn-danger  btn-rounded btn-fw">
                            Add
                          </button>
                        ),

                        onClick: (e, members) => this.addMember(members.id),
                      },

                      {
                        icon: () => (
                          <button className="btn btn-danger  float-right">
                            X
                          </button>
                        ),

                        onClick: () => this.closeMembersModal(),
                        isFreeAction: true,
                      },
                    ]}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </body>
      </html>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    members: state.members,
  };
};
export default connect(mapStateToProps, {
  retrieveProjects,
  deleteProject,
  updateProject,
  createProject,
  retrieveProjectsByTitle,
  retrieveProjectMembers,
  retrieveAvailableMembers,
  addMember,
  deleteMember,
})(ProjectsList);
