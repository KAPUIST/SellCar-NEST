import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  isNumber,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1930)
  @Max(2030)
  year: number;
  @IsNumber()
  @Min(0)
  @Max(1000000)
  km: number;
  @IsLongitude()
  lng: number;
  @IsLatitude()
  lat: number;
  @IsNumber()
  @Min(0)
  @Max(10000000)
  price: number;
}
