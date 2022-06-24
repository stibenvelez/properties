
import FormNewProperty from "components/FormNewProperty/FormNewProperty";

const NewPropertyPage = () => {
    const renderSection1 = () => {
        return (
            <div className="space-y-6 sm:space-y-8">
                <div>
                    <h2 className="text-3xl font-semibold">
                        Registra un inmuble
                    </h2>
                    <p>Registre aqui un nuevo inmueble</p>
                </div>
                <FormNewProperty />
            </div>
        );
    };

    return (
        <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
            <div className="container pt-4 sm:pt-8 pb-24 lg:pb-32">
                {renderSection1()}
            </div>
        </div>
    );
};

export default NewPropertyPage;
