import { ValidationHelper } from "../helpers";


//ioc class that implements a simplified version of inversion of control. This class creates a tree of helper classes with dependency injection which is then consumed in the controllers. see user controller for usage example
export class Ioc {

    getMapping() {
        return {
            validationHelper: new ValidationHelper(),
            //add more helper classes. for example: cacheHelper()
        }
    }
}
