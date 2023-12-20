import { EstateAgent } from '../models/estate-agent.model';
import { MOCK_CUSTOMERS } from './customer.mock';

export const MOCK_ESTATE_AGENTS = [
    new EstateAgent(
        '1bf686e12-be31-48ca-9658-e296939c78d1',
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
