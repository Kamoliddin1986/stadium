export class CreateStadiumDto {
    readonly category_id: number;
    readonly owner_id: number;
    readonly contact_with: string;
    readonly name: string;
    readonly volume?: string;
    readonly region_id: number;
    readonly district_id?: number;
    readonly location: string;
    readonly builtAt?: Date;
    readonly start_time: string;
    readonly end_time: string;
    // readonly comfort: string;
}
