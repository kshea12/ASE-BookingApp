class Table {
    $key: string;
    available: boolean;
    number: number;
    reservedFor: string;
}

export interface Restaurant {
    $key: string;
    name: string;
    address: string;
    phone: string;
    description: string;
    tables: Table[];
}