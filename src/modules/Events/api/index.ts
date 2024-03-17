import { IEvent } from "../types";
import { api } from "src/services/api";
import type { TResponse } from "src/services/api/types";

class Api {
  private readonly api = api;

  public async getEvents(search: string): TResponse<IEvent[]> {
    return this.api.get("/api/event/", {
      search
    });
  }

  public async postEvents(file: File): TResponse<any> {
    const form = new FormData();
    // files.forEach((file) => {
    form.append("file", file);
    // });
    return this.api.post("/api/event/", form);
  }

  public async getEvent(id: string): TResponse<IEvent> {
    return this.api.get(`/api/event/${id}/`);
  }

  public async deleteEvent(id: string): TResponse<null> {
    return this.api.delete(`/api/event/${id}`);
  }

  public async getChat(
    id: string,
    message: string
  ): TResponse<{ text: string[] }> {
    return this.api.get(`/api/chat/?message=${message}&id=${id}`);
  }

  public async getEmail(id: string, email: string): TResponse<any> {
    return this.api.get(`/api/email/?email=${email}&id=${id}`);
  }

  public async getFileResult(id: string, doc_type: string): TResponse<string> {
    return this.api.get(
      `/api/docx/?id=${id}&doc_type=${doc_type}`,
      {},
      { responseType: "blob" }
    );
  }
}

export default new Api();
