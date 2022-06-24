import BadgeSatateProperty from 'components/BadgeStateProperty/BadgeSatateProperty';
import FormEditProperty from 'components/FormEditProperty/FormEditProperty';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPropertyByIdByUserId } from 'store/slice/properties/propertiesActions';

const EditPropertyPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        (() => {
          dispatch(getPropertyByIdByUserId(id));
      })()
    }, [])

    const { stateId, state } = useSelector(
        ({ properties }) => properties.property
    );
    
    const renderSection1 = () => {
        return (
            <div className="space-y-6 sm:space-y-8">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-semibold">
                            Editar inmueble
                        </h2>
                        <BadgeSatateProperty stateId={stateId} state={state} />
                    </div>
                    <p>Edite aqui el inmueble</p>
                </div>
                <FormEditProperty />
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

export default EditPropertyPage