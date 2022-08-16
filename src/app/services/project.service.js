import http from "../http-common";
class ProjetDataService {
  getAll() {
    return http.get("/Projets");
  }
  get(id) {
    return http.get(`/projet/${id}`);
  }
  create(data) {
    return http.post("/AddProjet", data);
  }
  update(id, data) {
    return http.put(`/updateProject/${id}`, data);
  }
  delete(id) {
    console.log(id);
    return http.delete("/deleteProject/" + id);
  }
  getByTitle(title) {
    return http.get("/Projets/" + title);
  }
  getProjetMembers(id) {
    return http.get("/projetsm/" + id);
  }
  getAvailableMembers(id) {
    return http.get("/projetm/" + id);
  }
  addMember(idp, id) {
    console.log(id);
    return http.post(`/projets/${idp}/users`, id);
  }
  deleteMember(idp, idu) {
    return http.delete(`/projets/${idp}/users/${idu}`);
  }
}
export default new ProjetDataService();
