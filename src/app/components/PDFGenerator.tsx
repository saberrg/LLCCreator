import { PDFDocument } from 'pdf-lib';

interface PDFGeneratorProps {
    formData: {
        llcName: string;
        principalAddress: {
            street: string;
            city: string;
            state: string;
            zip: string;
        };
        effectiveDate: string;
        registeredAgent: {
            name: string;
            street: string;
            city: string;
            state: string;
            zip: string;
        };
        purpose: string;
        duration: string;
        provisions: string;
        members: Array<{
            name: string;
            street: string;
            city: string;
            state: string;
            zip: string;
        }>;
        organizer: {
            name: string;
            street: string;
            city: string;
            state: string;
            zip: string;
        };
        professionalServices: string;
    };
}

export async function generatePDF({ formData }: PDFGeneratorProps) {
    try {
        // Load the PDF template
        const templateUrl = '/llc-form-template.pdf'; // Place your fillable PDF in the public folder
        const templateBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(templateBytes);
        
        // Get the form from the PDF
        const form = pdfDoc.getForm();

        // Fill the form fields
        // Note: Field names should match exactly with your PDF form field names
        const fields = {
            'llcName': formData.llcName,
            'principalStreet': formData.principalAddress.street,
            'principalCity': formData.principalAddress.city,
            'principalState': formData.principalAddress.state,
            'principalZip': formData.principalAddress.zip,
            'effectiveDate': formData.effectiveDate,
            'agentName': formData.registeredAgent.name,
            'agentStreet': formData.registeredAgent.street,
            'agentCity': formData.registeredAgent.city,
            'agentState': formData.registeredAgent.state,
            'agentZip': formData.registeredAgent.zip,
            'purpose': formData.purpose,
            'duration': formData.duration,
            'provisions': formData.provisions,
            'organizerName': formData.organizer.name,
            'organizerStreet': formData.organizer.street,
            'organizerCity': formData.organizer.city,
            'organizerState': formData.organizer.state,
            'organizerZip': formData.organizer.zip,
            'professionalServices': formData.professionalServices,
        };

        // Fill each field in the PDF
        Object.entries(fields).forEach(([fieldName, value]) => {
            try {
                const field = form.getTextField(fieldName);
                if (field) {
                    field.setText(value.toString());
                }
            } catch (error) {
                console.warn(`Field ${fieldName} not found in PDF`);
            }
        });

        // Handle members separately as they might have multiple fields
        formData.members.forEach((member, index) => {
            try {
                form.getTextField(`memberName${index + 1}`)?.setText(member.name);
                form.getTextField(`memberStreet${index + 1}`)?.setText(member.street);
                form.getTextField(`memberCity${index + 1}`)?.setText(member.city);
                form.getTextField(`memberState${index + 1}`)?.setText(member.state);
                form.getTextField(`memberZip${index + 1}`)?.setText(member.zip);
            } catch (error) {
                console.warn(`Member ${index + 1} fields not found in PDF`);
            }
        });

        // Save the PDF
        const pdfBytes = await pdfDoc.save();
        
        // Create a download link
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${formData.llcName.replace(/\s+/g, '-')}-LLC-Application.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
} 