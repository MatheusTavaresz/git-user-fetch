export interface IFilterProps {
    filterType: string;
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFilterTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }