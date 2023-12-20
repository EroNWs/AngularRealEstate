import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EstateAgent } from '../models/estate-agent.model';
import { MOCK_ESTATE_AGENTS } from '../mocks/estate-agent.mock';


@Injectable({
  providedIn: 'root',
})
export class EstateAgentService {
    getEstateAgents(): Observable<EstateAgent[]> {
        return of(MOCK_ESTATE_AGENTS);
      }

      getEstateAgentById(id: string): Observable<EstateAgent | undefined> {
        return of(MOCK_ESTATE_AGENTS.find(agent => agent.id === id));
    }

      deleteEstateAgent(id: string): Observable<void> {
        // Burada gerçek bir silme işlemi yapılmıyor, mock veri üzerinden simülasyon yapılıyor.
        const index = MOCK_ESTATE_AGENTS.findIndex(agent => agent.id === id);
        if (index > -1) {
          MOCK_ESTATE_AGENTS.splice(index, 1);
        }
        return of(undefined);
      }

      addEstateAgent(agent: EstateAgent): Observable<EstateAgent> {
        agent.id = this.generateId();
        MOCK_ESTATE_AGENTS.push(agent);
        return of(agent);
      }

      updateEstateAgent(agent: EstateAgent): Observable<EstateAgent> {
    const index = MOCK_ESTATE_AGENTS.findIndex(a => a.id === agent.id);
    if (index > -1) {
      MOCK_ESTATE_AGENTS[index] = agent;
    }
    return of(agent);
  }
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
