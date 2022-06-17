import CommonLayout from "containers/AccountPage/CommonLayout";
import FormNewProperty from "components/FormNewProperty/FormNewProperty";

const NewPropertyPage = () => {
    const renderSection1 = () => {
        return (
            <div className="space-y-6 sm:space-y-8">
                <div>
                    <h2 className="text-3xl font-semibold">Save lists</h2>
                </div>
                <FormNewProperty />
            </div>
        );
    };

    return (
        <div>
            <CommonLayout>{renderSection1()}</CommonLayout>
        </div>
    );
};

export default NewPropertyPage;
