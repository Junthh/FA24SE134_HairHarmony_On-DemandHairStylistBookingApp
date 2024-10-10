import React from 'react'
import { PriceRangeSliderWrapStyle } from './styles'
import Slider from '@mui/material/Slider';
import SelectElement from 'components/Form/SelectElement/SelectElement';
import { useForm } from 'react-hook-form';

// MOCK
const monthOption = [
    { label: 'Each Month', value: 1 },
    { label: 'Two Month', value: 2 },
]


export default function PriceRangeSlider() {
    // FORM
    const formContext = useForm<any>({
        defaultValues: {
            month: 1,
        },
        mode: 'onSubmit',
    });
    const { control, setValue, getValues, handleSubmit, reset, watch, formState: { errors }, } = formContext;

    // State
    const [range, setRange] = React.useState<number[]>([0, 3000]);

    // handle function
    const handleChange = (event: Event, newValue: number | number[]) => {
        setRange(newValue as number[]);
    };

    return (
        <PriceRangeSliderWrapStyle>
            <div className="silder__container">
                <div className="silder-label">
                    <span className="silder-label-item">$0</span>
                    <span className="silder-label-item">$3000</span>
                </div>
                <Slider
                    className='slider'
                    getAriaLabel={() => 'Price Range'}
                    value={range}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={3000}
                />
            </div>
            <div className="slider-value">
                ${range[0]} {' '}-{' '}${range[1]}
            </div>
            <SelectElement
                name="month"
                control={control}
                label=""
                options={monthOption}
            />
        </PriceRangeSliderWrapStyle>
    )
}
