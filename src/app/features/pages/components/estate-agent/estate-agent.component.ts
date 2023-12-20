import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EstateAgent } from '../../models/estate-agent.model';
import { EstateAgentService } from '../../services/estate-agent.service';
import { RealEstate } from '../../models/real-estate.model';
import { RealEstateType } from 'src/app/shared/enums/real-estate-type.enum';
import { Status } from 'src/app/shared/enums/status.enum';
import MOCK_ESTATE_AGENTS from '../../mocks/estate-agent.mock';

@Component({
    templateUrl: './estate-agent.component.html',
    providers: [MessageService],
})
export class EstateAgentComponent implements OnInit {
    estateAgents: EstateAgent[] = [];
    selectedEstateAgents: EstateAgent[] = [];
    selectedEstateAgent: any;
    estateAgentDialog: boolean = false;
    isLoading: boolean = true;
    isNewEstateAgent: boolean = false;

    constructor(
        private estateAgentService: EstateAgentService,
        private messageService: MessageService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    getEstateAgents(): EstateAgent[] {
        return MOCK_ESTATE_AGENTS;
    }
    addEstateAgent(agent: EstateAgent): void {
        MOCK_ESTATE_AGENTS.push(agent);
    }



    saveUpdateEstateAgent() {
        if (this.isNewEstateAgent) {
            this.saveEstateAgent();
        } else {
            this.updateEstateAgent(this.selectedEstateAgent);
        }
    }


    updateEstateAgent(agent: EstateAgent):void {
     // Mevcut emlakçıyı güncelle
     const index = this.estateAgents.findIndex(agent => agent.id === this.selectedEstateAgent.id);
     if (index !== -1) {
         MOCK_ESTATE_AGENTS[index] = agent;
     }

     this.estateAgentService.updateEstateAgent(this.selectedEstateAgent);

     if (index !== -1) {
         this.estateAgents[index] = this.selectedEstateAgent;
     }


    this.estateAgentDialog = false;
    this.selectedEstateAgent = new EstateAgent();
}


    deleteEstateAgent(agentId: string): void {
        const index = MOCK_ESTATE_AGENTS.findIndex((a) => a.id === agentId);
        if (index !== -1) {
            MOCK_ESTATE_AGENTS.splice(index, 1);
        }
    }

    ngOnInit() {
        this.loadEstateAgents();
    }


loadEstateAgents() {
    // ...
    this.estateAgentService.getEstateAgents().subscribe(
        (data) => {
            this.estateAgents = data;
            this.isLoading = false;
            this.changeDetectorRef.detectChanges(); // Değişiklikleri algıla
        },
        // ...
    );
}

showAddEstateAgentDialog() {
    this.selectedEstateAgent = new EstateAgent();
    this.isNewEstateAgent = true;
    this.estateAgentDialog = true;
}

showEditEstateAgentDialog(estateAgent: EstateAgent) {
    this.selectedEstateAgent = { ...estateAgent };
    this.isNewEstateAgent = false;
    this.estateAgentDialog = true;
}

    generateRandomId() {
        return 'xxxx-xxxx-4xxx-yxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    saveEstateAgent() {
        if (!this.selectedEstateAgent.id) {
            // Yeni ID oluştur
            this.selectedEstateAgent.id = this.generateRandomId();
        }
        this.estateAgentService.addEstateAgent(this.selectedEstateAgent);

        // Emlakçı listesini yenile ve dialogu kapat
        this.estateAgentDialog = false;
        this.selectedEstateAgent = new EstateAgent();
    }




    deleteSelectedEstateAgents() {
        this.selectedEstateAgents.forEach((agent) => {
            this.estateAgentService
                .deleteEstateAgent(agent.id)
                .subscribe(() => {
                    this.loadEstateAgents();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: 'Emlakçı silindi',
                    });
                });
        });
        this.selectedEstateAgents = [];
    }

    hideEstateAgentDialog() {
        this.estateAgentDialog = false; // Dialogu kapat
    }

    confirmDeleteEstateAgent(estateAgent: EstateAgent) {
        this.estateAgentService
            .deleteEstateAgent(estateAgent.id)
            .subscribe(() => {
                this.loadEstateAgents();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Emlakçı silindi',
                });
            });
    }
}
