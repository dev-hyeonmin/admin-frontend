import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ChevronLeft, ChevronRight, TriangleAlert } from 'lucide-react';

interface FormDatePickerProps {
  name: string;
  errors?: string[];
  onChange?: () => void;
  value?: string;
}

const FormDatePicker = ({ name, value, errors = [] }: FormDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <>
      <DatePicker
        selected={startDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => setStartDate(date)}
        className="w-full rounded-lg border border-gray-200 p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        calendarClassName="tailwind-datepicker"
        locale={ko}
        name={name}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-1">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              aria-label="Previous Month"
              className="text-gray-600 hover:text-gray-900"
            >
              {/* 왼쪽 화살표 아이콘 */}
              <ChevronLeft size={20} />
            </button>
            <span className="font-semibold text-gray-900">
              {date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              aria-label="Next Month"
              className="text-gray-600 hover:text-gray-900"
            >
              {/* 오른쪽 화살표 아이콘 */}
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      />

      {errors.map((error, index) => (
        <span
          key={index}
          className="mt-1 flex items-center gap-1 pl-0.5 text-sm font-medium text-red-500"
        >
          <TriangleAlert size={14} /> {error}
        </span>
      ))}
    </>
  );
};

export default FormDatePicker;
