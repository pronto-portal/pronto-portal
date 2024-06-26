/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    '\n    mutation AddAndCreateTranslator($input: AddAndCreateTranslatorInput!) {\n        addAndCreateTranslator(input: $input) {\n            id\n            email\n            firstName\n            lastName\n            city\n            state\n            phone\n            languages\n            translatingFor {\n                firstName\n                lastName\n                phone\n                email\n            }\n        }\n    }\n':
        types.AddAndCreateTranslatorDocument,
    '\n    mutation addNonUserTranslator($input: AddNonUserTranslatorInput!) {\n        addNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n':
        types.AddNonUserTranslatorDocument,
    '\n    mutation UpdateUser($input: CompleteProfileInput!) {\n        completeProfile(input: $input) {\n            id\n            createdAt\n            updatedAt\n            email\n            phone\n            firstName\n            lastName\n            isManager\n            isTranslator\n            isBanned\n            isProfileComplete\n            city\n            state\n            languages\n        }\n    }\n':
        types.UpdateUserDocument,
    '\n    mutation CreateAddress($input: CreateAddressInput!) {\n        createAddress(input: $input) {\n            id\n            address1\n            address2\n            city\n            state\n            zipCode\n        }\n    }\n':
        types.CreateAddressDocument,
    '\n    mutation createAssignment($input: CreateAssignmentInput!) {\n        createAssignment(input: $input) {\n            id\n            dateTime\n            address {\n                id\n                address1\n                address2\n                city\n                state\n                zipCode\n            }\n            assignedTo {\n                id\n                firstName\n                lastName\n            }\n            createdBy {\n                id\n                firstName\n                lastName\n            }\n            claimant {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n':
        types.CreateAssignmentDocument,
    '\n    mutation CreateClaimant($input: CreateClaimantInput!) {\n        createClaimant(input: $input) {\n            id\n            firstName\n            lastName\n            email\n            phone\n            languages\n        }\n    }\n':
        types.CreateClaimantDocument,
    '\n    mutation createReminder($input: CreateReminderInput!) {\n        createReminder(input: $input) {\n            id\n            translatorMessage\n            claimantMessage\n            assignment {\n                id\n                dateTime\n                assignedTo {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n                claimant {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n            }\n        }\n    }\n':
        types.CreateReminderDocument,
    '\n    mutation deleteNonUserTranslator($input: ByIdInput!) {\n        deleteNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n':
        types.DeleteNonUserTranslatorDocument,
    '\n    mutation updateAddress($input: UpdateAddressInput!) {\n        updateAddress(input: $input) {\n            id\n            address1\n            address2\n            city\n            state\n            zipCode\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n':
        types.UpdateAddressDocument,
    '\n    mutation updateAssignment($input: UpdateAssignmentInput!) {\n        updateAssignment(input: $input) {\n            id\n            dateTime\n            address {\n                id\n                address1\n                address2\n                city\n                state\n                zipCode\n            }\n            assignedTo {\n                id\n                firstName\n                lastName\n            }\n            assignedTo {\n                id\n                firstName\n                lastName\n            }\n            createdBy {\n                id\n                firstName\n                lastName\n            }\n            claimant {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n':
        types.UpdateAssignmentDocument,
    '\n    mutation updateClaimant($input: UpdateClaimantInput!) {\n        updateClaimant(input: $input) {\n            id\n            firstName\n            lastName\n            phone\n            email\n            languages\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n':
        types.UpdateClaimantDocument,
    '\n    mutation updateNonUserTranslator($input: UpdateNonUserTranslatorInput!) {\n        updateNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n':
        types.UpdateNonUserTranslatorDocument,
    '\n    mutation updateReminder($input: UpdateReminderInput!) {\n        updateReminder(input: $input) {\n            id\n            translatorMessage\n            claimantMessage\n            assignment {\n                id\n                dateTime\n                assignedTo {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n                claimant {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n            }\n        }\n    }\n':
        types.UpdateReminderDocument,
    '\n    mutation UpdateUserInfo($input: UpdateUserInput!) {\n        updateUser(input: $input) {\n            id\n            email\n            updatedAt\n            firstName\n            lastName\n            phone\n            languages\n            translatingFor {\n                id\n                firstName\n                lastName\n                languages\n                email\n                phone\n            }\n            translators {\n                id\n                firstName\n                lastName\n                languages\n                email\n                phone\n            }\n            city\n            state\n            isTranslator\n            isManager\n            isProfileComplete\n        }\n    }\n':
        types.UpdateUserInfoDocument,
    '\n    query GetAddress($input: ByIdInput!) {\n        getAddress(input: $input) {\n            id\n            address1\n            address2\n            city\n            state\n            zipCode\n        }\n    }\n':
        types.GetAddressDocument,
    '\n    query GetAddresses($input: PaginatedInput, $where: AddressesFilter) {\n        getAddresses(input: $input, where: $where) {\n            totalRowCount\n            addresses {\n                id\n                address1\n                address2\n                city\n                state\n                zipCode\n                assignment {\n                    id\n                    dateTime\n                    createdBy {\n                        id\n                    }\n                }\n                user {\n                    id\n                }\n            }\n        }\n    }\n':
        types.GetAddressesDocument,
    '\n    query GetAssignments($input: PaginatedInput, $where: AssignmentsFilter) {\n        getAssignments(input: $input, where: $where) {\n            assignments {\n                id\n                dateTime\n                address {\n                    id\n                    address1\n                    address2\n                    city\n                    state\n                    zipCode\n                }\n                assignedToUser {\n                    id\n                    email\n                    phone\n                    firstName\n                    lastName\n                    city\n                    state\n                    languages\n                }\n                createdBy {\n                    id\n                    email\n                    phone\n                    firstName\n                    lastName\n                    city\n                    state\n                    languages\n                }\n                claimant {\n                    id\n                    firstName\n                    lastName\n                    email\n                    phone\n                    languages\n                    primaryLanguage\n                }\n                assignedTo {\n                    id\n                    email\n                    phone\n                    firstName\n                    lastName\n                    city\n                    state\n                    languages\n                }\n                isComplete\n                createdAt\n                claimantNoShow\n                translatorNoShow\n            }\n            totalRowCount\n        }\n    }\n':
        types.GetAssignmentsDocument,
    '\n    query getClaimant($input: ByIdInput!) {\n        getClaimant(input: $input) {\n            id\n            firstName\n            lastName\n            email\n            phone\n            primaryLanguage\n            languages\n        }\n    }\n':
        types.GetClaimantDocument,
    '\n    query getClaimants($input: PaginatedInput, $where: ClaimantsFilter) {\n        getClaimants(input: $input, where: $where) {\n            totalRowCount\n            claimants {\n                id\n                firstName\n                lastName\n                email\n                phone\n                user {\n                    id\n                }\n                primaryLanguage\n                languages\n            }\n        }\n    }\n':
        types.GetClaimantsDocument,
    '\n    query GetLanguages {\n        getLanguages {\n            name\n            code\n        }\n    }\n': types.GetLanguagesDocument,
    '\n    query GetNonUserTranslator($input: ByIdInput!) {\n        getNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n':
        types.GetNonUserTranslatorDocument,
    '\n    query GetNonUserTranslators($input: PaginatedInput, $where: TranslatorsFilter) {\n        getNonUserTranslators(input: $input, where: $where) {\n            totalRowCount\n            translators {\n                id\n                email\n                phone\n                firstName\n                lastName\n                languages\n            }\n        }\n    }\n':
        types.GetNonUserTranslatorsDocument,
    '\n    query GetReminder($input: ByIdInput!) {\n        getReminder(input: $input) {\n            id\n            translatorMessage\n            claimantMessage\n            assignment {\n                id\n                dateTime\n                createdBy {\n                    id\n                }\n            }\n            createdBy {\n                id\n            }\n        }\n    }\n':
        types.GetReminderDocument,
    '\n    query GetReminders($input: PaginatedInput!) {\n        getReminders(input: $input) {\n            reminders {\n                id\n                translatorMessage\n                claimantMessage\n                assignment {\n                    id\n                    dateTime\n                    createdBy {\n                        id\n                    }\n                }\n                createdBy {\n                    id\n                }\n            }\n        }\n    }\n':
        types.GetRemindersDocument,
    '\n    query GetRoles {\n        getRoles {\n            name\n            description\n            features\n            stripePriceId\n            priceCents\n            translatorsLimit\n            remindersLimit\n        }\n    }\n':
        types.GetRolesDocument,
    '\n    query GetTranslator($input: ByIdInput!) {\n        getTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n':
        types.GetTranslatorDocument,
    '\n    query GetTranslators($input: PaginatedInput, $where: TranslatorsFilter) {\n        getTranslators(input: $input, where: $where) {\n            totalRowCount\n            translators {\n                id\n                email\n                phone\n                firstName\n                lastName\n                languages\n            }\n        }\n    }\n':
        types.GetTranslatorsDocument,
    '\n    query GetUser {\n        getUser {\n            id\n            createdAt\n            updatedAt\n            email\n            phone\n            firstName\n            lastName\n            profilePic\n            isManager\n            isTranslator\n            isBanned\n            isProfileComplete\n            city\n            state\n            languages\n            autoRenewSubscription\n            subscriptionEndDate\n            translatorsCount\n            remindersCount\n            remindersCreatedThisMonth\n            role {\n                name\n                description\n                priceCents\n                features\n                stripePriceId\n                remindersLimit\n                translatorsLimit\n            }\n        }\n    }\n':
        types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation AddAndCreateTranslator($input: AddAndCreateTranslatorInput!) {\n        addAndCreateTranslator(input: $input) {\n            id\n            email\n            firstName\n            lastName\n            city\n            state\n            phone\n            languages\n            translatingFor {\n                firstName\n                lastName\n                phone\n                email\n            }\n        }\n    }\n'
): (typeof documents)['\n    mutation AddAndCreateTranslator($input: AddAndCreateTranslatorInput!) {\n        addAndCreateTranslator(input: $input) {\n            id\n            email\n            firstName\n            lastName\n            city\n            state\n            phone\n            languages\n            translatingFor {\n                firstName\n                lastName\n                phone\n                email\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation addNonUserTranslator($input: AddNonUserTranslatorInput!) {\n        addNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'
): (typeof documents)['\n    mutation addNonUserTranslator($input: AddNonUserTranslatorInput!) {\n        addNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation UpdateUser($input: CompleteProfileInput!) {\n        completeProfile(input: $input) {\n            id\n            createdAt\n            updatedAt\n            email\n            phone\n            firstName\n            lastName\n            isManager\n            isTranslator\n            isBanned\n            isProfileComplete\n            city\n            state\n            languages\n        }\n    }\n'
): (typeof documents)['\n    mutation UpdateUser($input: CompleteProfileInput!) {\n        completeProfile(input: $input) {\n            id\n            createdAt\n            updatedAt\n            email\n            phone\n            firstName\n            lastName\n            isManager\n            isTranslator\n            isBanned\n            isProfileComplete\n            city\n            state\n            languages\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation CreateAddress($input: CreateAddressInput!) {\n        createAddress(input: $input) {\n            id\n            address1\n            address2\n            city\n            state\n            zipCode\n        }\n    }\n'
): (typeof documents)['\n    mutation CreateAddress($input: CreateAddressInput!) {\n        createAddress(input: $input) {\n            id\n            address1\n            address2\n            city\n            state\n            zipCode\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation createAssignment($input: CreateAssignmentInput!) {\n        createAssignment(input: $input) {\n            id\n            dateTime\n            address {\n                id\n                address1\n                address2\n                city\n                state\n                zipCode\n            }\n            assignedTo {\n                id\n                firstName\n                lastName\n            }\n            createdBy {\n                id\n                firstName\n                lastName\n            }\n            claimant {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n'
): (typeof documents)['\n    mutation createAssignment($input: CreateAssignmentInput!) {\n        createAssignment(input: $input) {\n            id\n            dateTime\n            address {\n                id\n                address1\n                address2\n                city\n                state\n                zipCode\n            }\n            assignedTo {\n                id\n                firstName\n                lastName\n            }\n            createdBy {\n                id\n                firstName\n                lastName\n            }\n            claimant {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation CreateClaimant($input: CreateClaimantInput!) {\n        createClaimant(input: $input) {\n            id\n            firstName\n            lastName\n            email\n            phone\n            languages\n        }\n    }\n'
): (typeof documents)['\n    mutation CreateClaimant($input: CreateClaimantInput!) {\n        createClaimant(input: $input) {\n            id\n            firstName\n            lastName\n            email\n            phone\n            languages\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation createReminder($input: CreateReminderInput!) {\n        createReminder(input: $input) {\n            id\n            translatorMessage\n            claimantMessage\n            assignment {\n                id\n                dateTime\n                assignedTo {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n                claimant {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n            }\n        }\n    }\n'
): (typeof documents)['\n    mutation createReminder($input: CreateReminderInput!) {\n        createReminder(input: $input) {\n            id\n            translatorMessage\n            claimantMessage\n            assignment {\n                id\n                dateTime\n                assignedTo {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n                claimant {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation deleteNonUserTranslator($input: ByIdInput!) {\n        deleteNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'
): (typeof documents)['\n    mutation deleteNonUserTranslator($input: ByIdInput!) {\n        deleteNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation updateAddress($input: UpdateAddressInput!) {\n        updateAddress(input: $input) {\n            id\n            address1\n            address2\n            city\n            state\n            zipCode\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n'
): (typeof documents)['\n    mutation updateAddress($input: UpdateAddressInput!) {\n        updateAddress(input: $input) {\n            id\n            address1\n            address2\n            city\n            state\n            zipCode\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation updateAssignment($input: UpdateAssignmentInput!) {\n        updateAssignment(input: $input) {\n            id\n            dateTime\n            address {\n                id\n                address1\n                address2\n                city\n                state\n                zipCode\n            }\n            assignedTo {\n                id\n                firstName\n                lastName\n            }\n            assignedTo {\n                id\n                firstName\n                lastName\n            }\n            createdBy {\n                id\n                firstName\n                lastName\n            }\n            claimant {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n'
): (typeof documents)['\n    mutation updateAssignment($input: UpdateAssignmentInput!) {\n        updateAssignment(input: $input) {\n            id\n            dateTime\n            address {\n                id\n                address1\n                address2\n                city\n                state\n                zipCode\n            }\n            assignedTo {\n                id\n                firstName\n                lastName\n            }\n            assignedTo {\n                id\n                firstName\n                lastName\n            }\n            createdBy {\n                id\n                firstName\n                lastName\n            }\n            claimant {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation updateClaimant($input: UpdateClaimantInput!) {\n        updateClaimant(input: $input) {\n            id\n            firstName\n            lastName\n            phone\n            email\n            languages\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n'
): (typeof documents)['\n    mutation updateClaimant($input: UpdateClaimantInput!) {\n        updateClaimant(input: $input) {\n            id\n            firstName\n            lastName\n            phone\n            email\n            languages\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation updateNonUserTranslator($input: UpdateNonUserTranslatorInput!) {\n        updateNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'
): (typeof documents)['\n    mutation updateNonUserTranslator($input: UpdateNonUserTranslatorInput!) {\n        updateNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation updateReminder($input: UpdateReminderInput!) {\n        updateReminder(input: $input) {\n            id\n            translatorMessage\n            claimantMessage\n            assignment {\n                id\n                dateTime\n                assignedTo {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n                claimant {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n            }\n        }\n    }\n'
): (typeof documents)['\n    mutation updateReminder($input: UpdateReminderInput!) {\n        updateReminder(input: $input) {\n            id\n            translatorMessage\n            claimantMessage\n            assignment {\n                id\n                dateTime\n                assignedTo {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n                claimant {\n                    id\n                    firstName\n                    lastName\n                    languages\n                }\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation UpdateUserInfo($input: UpdateUserInput!) {\n        updateUser(input: $input) {\n            id\n            email\n            updatedAt\n            firstName\n            lastName\n            phone\n            languages\n            translatingFor {\n                id\n                firstName\n                lastName\n                languages\n                email\n                phone\n            }\n            translators {\n                id\n                firstName\n                lastName\n                languages\n                email\n                phone\n            }\n            city\n            state\n            isTranslator\n            isManager\n            isProfileComplete\n        }\n    }\n'
): (typeof documents)['\n    mutation UpdateUserInfo($input: UpdateUserInput!) {\n        updateUser(input: $input) {\n            id\n            email\n            updatedAt\n            firstName\n            lastName\n            phone\n            languages\n            translatingFor {\n                id\n                firstName\n                lastName\n                languages\n                email\n                phone\n            }\n            translators {\n                id\n                firstName\n                lastName\n                languages\n                email\n                phone\n            }\n            city\n            state\n            isTranslator\n            isManager\n            isProfileComplete\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetAddress($input: ByIdInput!) {\n        getAddress(input: $input) {\n            id\n            address1\n            address2\n            city\n            state\n            zipCode\n        }\n    }\n'
): (typeof documents)['\n    query GetAddress($input: ByIdInput!) {\n        getAddress(input: $input) {\n            id\n            address1\n            address2\n            city\n            state\n            zipCode\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetAddresses($input: PaginatedInput, $where: AddressesFilter) {\n        getAddresses(input: $input, where: $where) {\n            totalRowCount\n            addresses {\n                id\n                address1\n                address2\n                city\n                state\n                zipCode\n                assignment {\n                    id\n                    dateTime\n                    createdBy {\n                        id\n                    }\n                }\n                user {\n                    id\n                }\n            }\n        }\n    }\n'
): (typeof documents)['\n    query GetAddresses($input: PaginatedInput, $where: AddressesFilter) {\n        getAddresses(input: $input, where: $where) {\n            totalRowCount\n            addresses {\n                id\n                address1\n                address2\n                city\n                state\n                zipCode\n                assignment {\n                    id\n                    dateTime\n                    createdBy {\n                        id\n                    }\n                }\n                user {\n                    id\n                }\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetAssignments($input: PaginatedInput, $where: AssignmentsFilter) {\n        getAssignments(input: $input, where: $where) {\n            assignments {\n                id\n                dateTime\n                address {\n                    id\n                    address1\n                    address2\n                    city\n                    state\n                    zipCode\n                }\n                assignedToUser {\n                    id\n                    email\n                    phone\n                    firstName\n                    lastName\n                    city\n                    state\n                    languages\n                }\n                createdBy {\n                    id\n                    email\n                    phone\n                    firstName\n                    lastName\n                    city\n                    state\n                    languages\n                }\n                claimant {\n                    id\n                    firstName\n                    lastName\n                    email\n                    phone\n                    languages\n                    primaryLanguage\n                }\n                assignedTo {\n                    id\n                    email\n                    phone\n                    firstName\n                    lastName\n                    city\n                    state\n                    languages\n                }\n                isComplete\n                createdAt\n                claimantNoShow\n                translatorNoShow\n            }\n            totalRowCount\n        }\n    }\n'
): (typeof documents)['\n    query GetAssignments($input: PaginatedInput, $where: AssignmentsFilter) {\n        getAssignments(input: $input, where: $where) {\n            assignments {\n                id\n                dateTime\n                address {\n                    id\n                    address1\n                    address2\n                    city\n                    state\n                    zipCode\n                }\n                assignedToUser {\n                    id\n                    email\n                    phone\n                    firstName\n                    lastName\n                    city\n                    state\n                    languages\n                }\n                createdBy {\n                    id\n                    email\n                    phone\n                    firstName\n                    lastName\n                    city\n                    state\n                    languages\n                }\n                claimant {\n                    id\n                    firstName\n                    lastName\n                    email\n                    phone\n                    languages\n                    primaryLanguage\n                }\n                assignedTo {\n                    id\n                    email\n                    phone\n                    firstName\n                    lastName\n                    city\n                    state\n                    languages\n                }\n                isComplete\n                createdAt\n                claimantNoShow\n                translatorNoShow\n            }\n            totalRowCount\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query getClaimant($input: ByIdInput!) {\n        getClaimant(input: $input) {\n            id\n            firstName\n            lastName\n            email\n            phone\n            primaryLanguage\n            languages\n        }\n    }\n'
): (typeof documents)['\n    query getClaimant($input: ByIdInput!) {\n        getClaimant(input: $input) {\n            id\n            firstName\n            lastName\n            email\n            phone\n            primaryLanguage\n            languages\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query getClaimants($input: PaginatedInput, $where: ClaimantsFilter) {\n        getClaimants(input: $input, where: $where) {\n            totalRowCount\n            claimants {\n                id\n                firstName\n                lastName\n                email\n                phone\n                user {\n                    id\n                }\n                primaryLanguage\n                languages\n            }\n        }\n    }\n'
): (typeof documents)['\n    query getClaimants($input: PaginatedInput, $where: ClaimantsFilter) {\n        getClaimants(input: $input, where: $where) {\n            totalRowCount\n            claimants {\n                id\n                firstName\n                lastName\n                email\n                phone\n                user {\n                    id\n                }\n                primaryLanguage\n                languages\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetLanguages {\n        getLanguages {\n            name\n            code\n        }\n    }\n'
): (typeof documents)['\n    query GetLanguages {\n        getLanguages {\n            name\n            code\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetNonUserTranslator($input: ByIdInput!) {\n        getNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'
): (typeof documents)['\n    query GetNonUserTranslator($input: ByIdInput!) {\n        getNonUserTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetNonUserTranslators($input: PaginatedInput, $where: TranslatorsFilter) {\n        getNonUserTranslators(input: $input, where: $where) {\n            totalRowCount\n            translators {\n                id\n                email\n                phone\n                firstName\n                lastName\n                languages\n            }\n        }\n    }\n'
): (typeof documents)['\n    query GetNonUserTranslators($input: PaginatedInput, $where: TranslatorsFilter) {\n        getNonUserTranslators(input: $input, where: $where) {\n            totalRowCount\n            translators {\n                id\n                email\n                phone\n                firstName\n                lastName\n                languages\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetReminder($input: ByIdInput!) {\n        getReminder(input: $input) {\n            id\n            translatorMessage\n            claimantMessage\n            assignment {\n                id\n                dateTime\n                createdBy {\n                    id\n                }\n            }\n            createdBy {\n                id\n            }\n        }\n    }\n'
): (typeof documents)['\n    query GetReminder($input: ByIdInput!) {\n        getReminder(input: $input) {\n            id\n            translatorMessage\n            claimantMessage\n            assignment {\n                id\n                dateTime\n                createdBy {\n                    id\n                }\n            }\n            createdBy {\n                id\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetReminders($input: PaginatedInput!) {\n        getReminders(input: $input) {\n            reminders {\n                id\n                translatorMessage\n                claimantMessage\n                assignment {\n                    id\n                    dateTime\n                    createdBy {\n                        id\n                    }\n                }\n                createdBy {\n                    id\n                }\n            }\n        }\n    }\n'
): (typeof documents)['\n    query GetReminders($input: PaginatedInput!) {\n        getReminders(input: $input) {\n            reminders {\n                id\n                translatorMessage\n                claimantMessage\n                assignment {\n                    id\n                    dateTime\n                    createdBy {\n                        id\n                    }\n                }\n                createdBy {\n                    id\n                }\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetRoles {\n        getRoles {\n            name\n            description\n            features\n            stripePriceId\n            priceCents\n            translatorsLimit\n            remindersLimit\n        }\n    }\n'
): (typeof documents)['\n    query GetRoles {\n        getRoles {\n            name\n            description\n            features\n            stripePriceId\n            priceCents\n            translatorsLimit\n            remindersLimit\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetTranslator($input: ByIdInput!) {\n        getTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'
): (typeof documents)['\n    query GetTranslator($input: ByIdInput!) {\n        getTranslator(input: $input) {\n            id\n            email\n            phone\n            firstName\n            lastName\n            city\n            state\n            languages\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetTranslators($input: PaginatedInput, $where: TranslatorsFilter) {\n        getTranslators(input: $input, where: $where) {\n            totalRowCount\n            translators {\n                id\n                email\n                phone\n                firstName\n                lastName\n                languages\n            }\n        }\n    }\n'
): (typeof documents)['\n    query GetTranslators($input: PaginatedInput, $where: TranslatorsFilter) {\n        getTranslators(input: $input, where: $where) {\n            totalRowCount\n            translators {\n                id\n                email\n                phone\n                firstName\n                lastName\n                languages\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetUser {\n        getUser {\n            id\n            createdAt\n            updatedAt\n            email\n            phone\n            firstName\n            lastName\n            profilePic\n            isManager\n            isTranslator\n            isBanned\n            isProfileComplete\n            city\n            state\n            languages\n            autoRenewSubscription\n            subscriptionEndDate\n            translatorsCount\n            remindersCount\n            remindersCreatedThisMonth\n            role {\n                name\n                description\n                priceCents\n                features\n                stripePriceId\n                remindersLimit\n                translatorsLimit\n            }\n        }\n    }\n'
): (typeof documents)['\n    query GetUser {\n        getUser {\n            id\n            createdAt\n            updatedAt\n            email\n            phone\n            firstName\n            lastName\n            profilePic\n            isManager\n            isTranslator\n            isBanned\n            isProfileComplete\n            city\n            state\n            languages\n            autoRenewSubscription\n            subscriptionEndDate\n            translatorsCount\n            remindersCount\n            remindersCreatedThisMonth\n            role {\n                name\n                description\n                priceCents\n                features\n                stripePriceId\n                remindersLimit\n                translatorsLimit\n            }\n        }\n    }\n'];

export function graphql(source: string) {
    return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
