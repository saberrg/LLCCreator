// pages/llc-form.js
"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { generatePDF } from './PDFGenerator';

export default function LLCForm() {
    const [formData, setFormData] = useState({
        llcName: '',
        principalAddress: {
            street: '',
            city: '',
            state: 'IL',
            zip: ''
        },
        effectiveDate: 'filing', // 'filing' or date string
        registeredAgent: {
            name: '',
            street: '',
            city: '',
            state: 'IL',
            zip: ''
        },
        purpose: '',
        duration: 'perpetual', // 'perpetual' or specific date
        provisions: '',
        members: [
            { name: '', street: '', city: '', state: 'IL', zip: '' }
        ],
        organizer: {
            name: '',
            street: '',
            city: '',
            state: 'IL',
            zip: ''
        },
        professionalServices: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, path: string) => {
        const keys = path.split('.');
        setFormData(prev => {
            const newData = { ...prev };
            let current: any = newData;
            keys.forEach((key, idx) => {
                if (idx === keys.length - 1) {
                    current[key] = e.target.value;
                } else {
                    current = current[key];
                }
            });
            return newData;
        });
    };

    const addMember = () => {
        setFormData(prev => ({
            ...prev,
            members: [...prev.members, { name: '', street: '', city: '', state: 'IL', zip: '' }]
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await generatePDF({ formData });
        } catch (error) {
            console.error('Error handling form submission:', error);
            // Handle error appropriately (show user feedback, etc.)
        }
    };

    const inputClasses = "w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm hover:border-gray-400 transition-colors";
    const disabledInputClasses = "w-full px-4 py-2 border-2 border-gray-200 rounded-md bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300 shadow-sm";
    const textareaClasses = "w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm min-h-[100px] hover:border-gray-400 transition-colors";
    const selectClasses = "w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm hover:border-gray-400 transition-colors";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg my-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">LLC Application Form</h1>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LLC Name</label>
                    <input 
                        type="text" 
                        value={formData.llcName} 
                        onChange={(e) => handleChange(e, 'llcName')} 
                        className={inputClasses}
                    />
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Principal Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street</label>
                            <input 
                                type="text" 
                                value={formData.principalAddress.street} 
                                onChange={(e) => handleChange(e, 'principalAddress.street')} 
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                            <input 
                                type="text" 
                                value={formData.principalAddress.city} 
                                onChange={(e) => handleChange(e, 'principalAddress.city')} 
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                            <input 
                                type="text" 
                                value={formData.principalAddress.state} 
                                disabled 
                                className={disabledInputClasses}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ZIP</label>
                            <input 
                                type="text" 
                                value={formData.principalAddress.zip} 
                                onChange={(e) => handleChange(e, 'principalAddress.zip')} 
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className={labelClasses}>Effective Date</label>
                    <select 
                        value={formData.effectiveDate} 
                        onChange={(e) => handleChange(e, 'effectiveDate')} 
                        className={selectClasses}
                    >
                        <option value="filing">Filing Date</option>
                        <option value="">Specific Date</option>
                    </select>
                    {formData.effectiveDate === '' && (
                        <input 
                            type="date" 
                            onChange={(e) => handleChange(e, 'effectiveDate')} 
                            className={inputClasses}
                        />
                    )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Registered Agent</h2>
                    <div className="space-y-4">
                        <div>
                            <label className={labelClasses}>Name</label>
                            <input 
                                type="text" 
                                value={formData.registeredAgent.name} 
                                onChange={(e) => handleChange(e, 'registeredAgent.name')} 
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Street</label>
                            <input 
                                type="text" 
                                value={formData.registeredAgent.street} 
                                onChange={(e) => handleChange(e, 'registeredAgent.street')} 
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>City</label>
                            <input 
                                type="text" 
                                value={formData.registeredAgent.city} 
                                onChange={(e) => handleChange(e, 'registeredAgent.city')} 
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>ZIP</label>
                            <input 
                                type="text" 
                                value={formData.registeredAgent.zip} 
                                onChange={(e) => handleChange(e, 'registeredAgent.zip')} 
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label>Purpose</label>
                    <textarea 
                        value={formData.purpose} 
                        onChange={(e) => handleChange(e, 'purpose')} 
                        className={textareaClasses}
                    />
                </div>

                <div>
                    <label>Duration</label>
                    <select 
                        value={formData.duration} 
                        onChange={(e) => handleChange(e, 'duration')} 
                        className={selectClasses}
                    >
                        <option value="perpetual">Perpetual</option>
                        <option value="">Specific Date</option>
                    </select>
                    {formData.duration === '' && (
                        <input 
                            type="date" 
                            onChange={(e) => handleChange(e, 'duration')} 
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <label>Other Provisions</label>
                    <textarea 
                        value={formData.provisions} 
                        onChange={(e) => handleChange(e, 'provisions')} 
                        className={textareaClasses}
                    />
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Members</h2>
                    {formData.members.map((member, index) => (
                        <div key={index} className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <div>
                                <label className={labelClasses}>Name</label>
                                <input 
                                    type="text" 
                                    value={member.name} 
                                    onChange={(e) => handleChange(e, `members.${index}.name`)} 
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Street</label>
                                <input 
                                    type="text" 
                                    value={member.street} 
                                    onChange={(e) => handleChange(e, `members.${index}.street`)} 
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>City</label>
                                <input 
                                    type="text" 
                                    value={member.city} 
                                    onChange={(e) => handleChange(e, `members.${index}.city`)} 
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>ZIP</label>
                                <input 
                                    type="text" 
                                    value={member.zip} 
                                    onChange={(e) => handleChange(e, `members.${index}.zip`)} 
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={addMember}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                    >
                        Add Member
                    </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Organizer</h2>
                    <div className="space-y-4">
                        <div>
                            <label className={labelClasses}>Name</label>
                            <input 
                                type="text" 
                                value={formData.organizer.name} 
                                onChange={(e) => handleChange(e, 'organizer.name')} 
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Street</label>
                            <input 
                                type="text" 
                                value={formData.organizer.street} 
                                onChange={(e) => handleChange(e, 'organizer.street')} 
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>City</label>
                            <input 
                                type="text" 
                                value={formData.organizer.city} 
                                onChange={(e) => handleChange(e, 'organizer.city')} 
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>ZIP</label>
                            <input 
                                type="text" 
                                value={formData.organizer.zip} 
                                onChange={(e) => handleChange(e, 'organizer.zip')} 
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label>Professional Services (if any)</label>
                    <textarea 
                        value={formData.professionalServices} 
                        onChange={(e) => handleChange(e, 'professionalServices')} 
                        className={textareaClasses}
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
}
