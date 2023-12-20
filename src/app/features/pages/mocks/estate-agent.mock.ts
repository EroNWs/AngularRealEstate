import { EstateAgent } from '../models/estate-agent.model';
import { MOCK_CUSTOMERS } from './customer.mock';

export const MOCK_ESTATE_AGENTS = [
    new EstateAgent(
        '1',
        'Estate Agency',
        'Jane',
        'Smith',
        '456 Elm St',
        'Gotham',
        'North',
        '12345',
        '505-678-9012',
        '542-789-0123',
        10,
        MOCK_CUSTOMERS.slice(0, 2)
    ),
];

export default MOCK_ESTATE_AGENTS;
