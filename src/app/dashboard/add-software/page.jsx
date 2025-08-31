import { AddSoftwareForm } from "@/components/dashboard/AddSoftwareForm";

const AddSoftware = () => {
    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Add New Software</h1>
                <p className="text-muted-foreground">Create a new software product with license key management</p>
            </div>
            <AddSoftwareForm />
        </div>
    );
};

export default AddSoftware;