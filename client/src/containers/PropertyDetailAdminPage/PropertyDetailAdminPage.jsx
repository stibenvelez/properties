import FormviewProperty from 'components/FormViewProperty/FormViewProperty';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getPropertyByIdByUserId } from 'store/slice/properties/propertiesActions';

const PropertyDetailAdminPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        (() => {
          dispatch(getPropertyByIdByUserId(id));
      })()
    }, [])

    const {loading} = useSelector(({ properties }) => properties);
    
    const renderSection1 = () => {
        return (
            <div className="space-y-6 sm:space-y-8">
                <div>
                    <h2 className="text-3xl font-semibold">
                        Informacion del inmueble
                    </h2>
                    <p>Este es el detalle del inmueble</p>
                </div>
               {!loading && <FormviewProperty />}
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

export default PropertyDetailAdminPage;