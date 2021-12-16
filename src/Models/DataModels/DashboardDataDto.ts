export interface dashboardDataDto {
    chartData: barChartDto[];
    liquid: number;
    doctors: number;
    patients: number;
    nurses: number;
    pharmacusts: number;
};

export interface barChartDto {
    value: number;
    year: string;
}