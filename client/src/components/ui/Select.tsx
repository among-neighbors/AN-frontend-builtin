import { Fragment, useCallback } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import cn from 'classnames';

import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

type SelectItem<TType> = {
  key: string;
  label: string;
  value: TType;
};

type SelectProps<TType> = {
  className?: string;
  label?: string;
  items: SelectItem<TType>[];
  selectedValue: TType;
  onSelect: (item: SelectItem<TType>) => void;
  optional?: boolean;
};

export default function Select<TType>({
  className,
  label,
  items,
  selectedValue,
  onSelect,
  optional = false,
}: SelectProps<TType>) {
  const getItemByValue = useCallback(
    (value: unknown) => {
      const idx = items.findIndex((val) => val.value === value);
      return idx !== -1 ? items[idx] : items[0];
    },
    [items],
  );

  // validations
  if (!items.length) {
    throw new Error(`Check items array (length). Received: ${items}`);
  }

  return (
    <div className={className}>
      <Listbox value={getItemByValue(selectedValue)} onChange={onSelect}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-base font-semibold text-gray-700">
              <span>{label}</span>
              <span className={cn('text-gray-400', { hidden: !optional })}>&nbsp;(선택)</span>
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                <span className="block truncate text-base">
                  {getItemByValue(selectedValue).label}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none z-10"
                >
                  {items.map((item) => (
                    <Listbox.Option
                      key={item.key}
                      className={({ active }) =>
                        cn(
                          active ? 'text-white bg-primary' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9',
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={cn(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {item.label}
                          </span>

                          {selected ? (
                            <span
                              className={cn(
                                active ? 'text-white' : 'text-primary',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
