/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: { input: any; output: any };
};

export type AddAndCreateTranslatorInput = {
    city?: InputMaybe<Scalars['String']['input']>;
    email: Scalars['String']['input'];
    firstName: Scalars['String']['input'];
    languages?: InputMaybe<Array<Scalars['String']['input']>>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    phone: Scalars['String']['input'];
    state?: InputMaybe<Scalars['String']['input']>;
};

export type AddNonUserTranslatorInput = {
    city?: InputMaybe<Scalars['String']['input']>;
    email: Scalars['String']['input'];
    firstName: Scalars['String']['input'];
    languages?: InputMaybe<Array<Scalars['String']['input']>>;
    lastName: Scalars['String']['input'];
    phone?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
};

export type AddTranslatorInput = {
    email: Scalars['String']['input'];
};

export type Address = {
    __typename?: 'Address';
    address1?: Maybe<Scalars['String']['output']>;
    address2?: Maybe<Scalars['String']['output']>;
    assignment?: Maybe<Array<Maybe<Assignment>>>;
    city?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    state?: Maybe<Scalars['String']['output']>;
    user?: Maybe<User>;
    userId?: Maybe<Scalars['String']['output']>;
    zipCode?: Maybe<Scalars['String']['output']>;
};

export type AddressesFilter = {
    address1?: InputMaybe<Scalars['String']['input']>;
    address2?: InputMaybe<Scalars['String']['input']>;
    city?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
    zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type Assignment = {
    __typename?: 'Assignment';
    address?: Maybe<Address>;
    assignedTo?: Maybe<Translator>;
    assignedToUser?: Maybe<Translator>;
    claimant?: Maybe<Claimant>;
    claimantNoShow?: Maybe<Scalars['Boolean']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    createdBy?: Maybe<User>;
    dateTime?: Maybe<Scalars['DateTime']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    isComplete?: Maybe<Scalars['Boolean']['output']>;
    translatorNoShow?: Maybe<Scalars['Boolean']['output']>;
};

export type AssignmentsFilter = {
    address?: InputMaybe<AddressesFilter>;
    assignedTo?: InputMaybe<TranslatorsFilter>;
    claimant?: InputMaybe<ClaimantsFilter>;
    date?: InputMaybe<Scalars['DateTime']['input']>;
    dateRange?: InputMaybe<DateRange>;
};

export type ByEmailInput = {
    email: Scalars['String']['input'];
};

export type ByIdInput = {
    id: Scalars['String']['input'];
};

export type Claimant = {
    __typename?: 'Claimant';
    assignment?: Maybe<Array<Maybe<Assignment>>>;
    email?: Maybe<Scalars['String']['output']>;
    firstName?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    languages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    lastName?: Maybe<Scalars['String']['output']>;
    phone?: Maybe<Scalars['String']['output']>;
    primaryLanguage?: Maybe<Scalars['String']['output']>;
    user?: Maybe<User>;
    userId?: Maybe<Scalars['String']['output']>;
};

export type ClaimantsFilter = {
    firstName?: InputMaybe<Scalars['String']['input']>;
    language?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    primaryLanguage?: InputMaybe<Scalars['String']['input']>;
};

export type CompleteProfileInput = {
    city: Scalars['String']['input'];
    firstName: Scalars['String']['input'];
    isManager: Scalars['Boolean']['input'];
    isTranslator: Scalars['Boolean']['input'];
    languages?: InputMaybe<Array<Scalars['String']['input']>>;
    lastName: Scalars['String']['input'];
    phone: Scalars['String']['input'];
    state: Scalars['String']['input'];
};

export type CreateAddressInput = {
    address1: Scalars['String']['input'];
    address2?: InputMaybe<Scalars['String']['input']>;
    city: Scalars['String']['input'];
    state: Scalars['String']['input'];
    zipCode: Scalars['String']['input'];
};

export type CreateAssignmentInput = {
    addressId: Scalars['String']['input'];
    claimantId: Scalars['String']['input'];
    dateTime: Scalars['DateTime']['input'];
    translatorId: Scalars['String']['input'];
};

export type CreateClaimantInput = {
    email?: InputMaybe<Scalars['String']['input']>;
    firstName: Scalars['String']['input'];
    languages?: InputMaybe<Array<Scalars['String']['input']>>;
    lastName: Scalars['String']['input'];
    phone: Scalars['String']['input'];
    primaryLanguage: Scalars['String']['input'];
};

export type CreateReminderInput = {
    assignmentId: Scalars['String']['input'];
    claimantMessage?: InputMaybe<Scalars['String']['input']>;
    translatorMessage?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRoleInput = {
    name: Scalars['String']['input'];
    priceCents: Scalars['Int']['input'];
};

export type CreateUserInput = {
    email: Scalars['String']['input'];
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    profilePic?: InputMaybe<Scalars['String']['input']>;
};

export type DateRange = {
    date1: Scalars['DateTime']['input'];
    date2: Scalars['DateTime']['input'];
};

export type DeleteRoleInput = {
    name: Scalars['String']['input'];
};

export type DisconnectTranslatorInput = {
    email: Scalars['String']['input'];
};

export type GetAddressesResponse = {
    __typename?: 'GetAddressesResponse';
    addresses: Array<Address>;
    totalRowCount: Scalars['Int']['output'];
};

export type GetAssignmentsResponse = {
    __typename?: 'GetAssignmentsResponse';
    assignments: Array<Assignment>;
    totalRowCount: Scalars['Int']['output'];
};

export type GetClaimantsResponse = {
    __typename?: 'GetClaimantsResponse';
    claimants: Array<Claimant>;
    totalRowCount: Scalars['Int']['output'];
};

export type GetNonUserTranslatorsResponse = {
    __typename?: 'GetNonUserTranslatorsResponse';
    totalRowCount: Scalars['Int']['output'];
    translators: Array<Translator>;
};

export type GetRemindersResponse = {
    __typename?: 'GetRemindersResponse';
    reminders: Array<Reminder>;
    totalRowCount: Scalars['Int']['output'];
};

export type GetTranslatorsResponse = {
    __typename?: 'GetTranslatorsResponse';
    totalRowCount: Scalars['Int']['output'];
    translators: Array<User>;
};

export type Language = {
    __typename?: 'Language';
    code?: Maybe<Scalars['String']['output']>;
    name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    addAndCreateTranslator?: Maybe<User>;
    addNonUserTranslator?: Maybe<Translator>;
    addTranslator?: Maybe<User>;
    completeProfile?: Maybe<User>;
    createAddress: Address;
    createAssignment: Assignment;
    createClaimant: Claimant;
    createReminder: Reminder;
    deleteAddress: Address;
    deleteAssignment: Assignment;
    deleteClaimant: Claimant;
    deleteNonUserTranslator?: Maybe<Translator>;
    deleteReminder: Reminder;
    disconnectTranslator?: Maybe<User>;
    updateAddress: Address;
    updateAssignment: Assignment;
    updateClaimant: Claimant;
    updateNonUserTranslator?: Maybe<Translator>;
    updateReminder: Reminder;
    updateUser?: Maybe<User>;
};

export type MutationAddAndCreateTranslatorArgs = {
    input: AddAndCreateTranslatorInput;
};

export type MutationAddNonUserTranslatorArgs = {
    input: AddNonUserTranslatorInput;
};

export type MutationAddTranslatorArgs = {
    input: AddTranslatorInput;
};

export type MutationCompleteProfileArgs = {
    input: CompleteProfileInput;
};

export type MutationCreateAddressArgs = {
    input: CreateAddressInput;
};

export type MutationCreateAssignmentArgs = {
    input: CreateAssignmentInput;
};

export type MutationCreateClaimantArgs = {
    input: CreateClaimantInput;
};

export type MutationCreateReminderArgs = {
    input: CreateReminderInput;
};

export type MutationDeleteAddressArgs = {
    input: ByIdInput;
};

export type MutationDeleteAssignmentArgs = {
    input: ByIdInput;
};

export type MutationDeleteClaimantArgs = {
    input: ByIdInput;
};

export type MutationDeleteNonUserTranslatorArgs = {
    input: ByIdInput;
};

export type MutationDeleteReminderArgs = {
    input: ByIdInput;
};

export type MutationDisconnectTranslatorArgs = {
    input: DisconnectTranslatorInput;
};

export type MutationUpdateAddressArgs = {
    input: UpdateAddressInput;
};

export type MutationUpdateAssignmentArgs = {
    input: UpdateAssignmentInput;
};

export type MutationUpdateClaimantArgs = {
    input: UpdateClaimantInput;
};

export type MutationUpdateNonUserTranslatorArgs = {
    input: UpdateNonUserTranslatorInput;
};

export type MutationUpdateReminderArgs = {
    input: UpdateReminderInput;
};

export type MutationUpdateUserArgs = {
    input: UpdateUserInput;
};

export type PaginatedInput = {
    countPerPage: Scalars['Int']['input'];
    page: Scalars['Int']['input'];
};

export type Query = {
    __typename?: 'Query';
    getAddress: Address;
    getAddresses: GetAddressesResponse;
    getAssignment: Assignment;
    getAssignments: GetAssignmentsResponse;
    getClaimant: Claimant;
    getClaimants: GetClaimantsResponse;
    getLanguages?: Maybe<Array<Maybe<Language>>>;
    getNonUserTranslator: Translator;
    getNonUserTranslators: GetNonUserTranslatorsResponse;
    getReminder: Reminder;
    getReminders: GetRemindersResponse;
    getRole?: Maybe<Role>;
    getRoles?: Maybe<Array<Maybe<Role>>>;
    getTranslator: User;
    getTranslators: GetTranslatorsResponse;
    getUser: User;
};

export type QueryGetAddressArgs = {
    input: ByIdInput;
};

export type QueryGetAddressesArgs = {
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<AddressesFilter>;
};

export type QueryGetAssignmentArgs = {
    input: ByIdInput;
};

export type QueryGetAssignmentsArgs = {
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<AssignmentsFilter>;
};

export type QueryGetClaimantArgs = {
    input: ByIdInput;
};

export type QueryGetClaimantsArgs = {
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<ClaimantsFilter>;
};

export type QueryGetNonUserTranslatorArgs = {
    input: ByIdInput;
};

export type QueryGetNonUserTranslatorsArgs = {
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<TranslatorsFilter>;
};

export type QueryGetReminderArgs = {
    input: ByIdInput;
};

export type QueryGetRemindersArgs = {
    input: PaginatedInput;
    where?: InputMaybe<RemindersFilter>;
};

export type QueryGetRoleArgs = {
    input: ByIdInput;
};

export type QueryGetTranslatorArgs = {
    input: ByIdInput;
};

export type QueryGetTranslatorsArgs = {
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<TranslatorsFilter>;
};

export type Reminder = {
    __typename?: 'Reminder';
    assignment?: Maybe<Assignment>;
    assignmentId?: Maybe<Scalars['String']['output']>;
    claimantMessage?: Maybe<Scalars['String']['output']>;
    createdBy?: Maybe<User>;
    createdById?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    translatorMessage?: Maybe<Scalars['String']['output']>;
};

export type RemindersFilter = {
    date?: InputMaybe<Scalars['String']['input']>;
    range?: InputMaybe<DateRange>;
};

export type Role = {
    __typename?: 'Role';
    description?: Maybe<Scalars['String']['output']>;
    features?: Maybe<Array<Scalars['String']['output']>>;
    name?: Maybe<Scalars['String']['output']>;
    priceCents?: Maybe<Scalars['Int']['output']>;
    remindersLimit?: Maybe<Scalars['Int']['output']>;
    stripePriceId?: Maybe<Scalars['String']['output']>;
    translatorsLimit?: Maybe<Scalars['Int']['output']>;
    users?: Maybe<Array<Maybe<User>>>;
};

export type Translator = {
    __typename?: 'Translator';
    assignedTo?: Maybe<Array<Maybe<Assignment>>>;
    city?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    firstName?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['String']['output']>;
    languages?: Maybe<Array<Scalars['String']['output']>>;
    lastName?: Maybe<Scalars['String']['output']>;
    phone?: Maybe<Scalars['String']['output']>;
    state?: Maybe<Scalars['String']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TranslatorsFilter = {
    city?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    languages?: InputMaybe<Array<Scalars['String']['input']>>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAddressInput = {
    address1?: InputMaybe<Scalars['String']['input']>;
    address2?: InputMaybe<Scalars['String']['input']>;
    city?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    state?: InputMaybe<Scalars['String']['input']>;
    zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAssignmentInput = {
    address?: InputMaybe<UpdateAddressInput>;
    addressId?: InputMaybe<Scalars['String']['input']>;
    claimantId?: InputMaybe<Scalars['String']['input']>;
    claimantNoShow?: InputMaybe<Scalars['Boolean']['input']>;
    dateTime?: InputMaybe<Scalars['DateTime']['input']>;
    id: Scalars['String']['input'];
    isComplete?: InputMaybe<Scalars['Boolean']['input']>;
    translatorId?: InputMaybe<Scalars['String']['input']>;
    translatorNoShow?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateClaimantInput = {
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    languages?: InputMaybe<Array<Scalars['String']['input']>>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    primaryLanguage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNonUserTranslatorInput = {
    city?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    languages?: InputMaybe<Array<Scalars['String']['input']>>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReminderInput = {
    claimantMessage?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    translatorMessage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
    description?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    priceCents?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
    city?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    isManager?: InputMaybe<Scalars['Boolean']['input']>;
    isProfileComplete?: InputMaybe<Scalars['Boolean']['input']>;
    isTranslator?: InputMaybe<Scalars['Boolean']['input']>;
    languages?: InputMaybe<Array<Scalars['String']['input']>>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    phone?: InputMaybe<Scalars['String']['input']>;
    profilePic?: InputMaybe<Scalars['String']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
    __typename?: 'User';
    assignedTo?: Maybe<Array<Maybe<Assignment>>>;
    assignments?: Maybe<Array<Maybe<Assignment>>>;
    autoRenewSubscription?: Maybe<Scalars['Boolean']['output']>;
    city?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    email: Scalars['String']['output'];
    firstName?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    isBanned?: Maybe<Scalars['Boolean']['output']>;
    isManager?: Maybe<Scalars['Boolean']['output']>;
    isProfileComplete?: Maybe<Scalars['Boolean']['output']>;
    isTranslator?: Maybe<Scalars['Boolean']['output']>;
    languages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    lastName?: Maybe<Scalars['String']['output']>;
    nonUserTranslators?: Maybe<Array<Maybe<Translator>>>;
    phone?: Maybe<Scalars['String']['output']>;
    profilePic?: Maybe<Scalars['String']['output']>;
    remindersCount?: Maybe<Scalars['Int']['output']>;
    remindersCreatedThisMonth?: Maybe<Scalars['Int']['output']>;
    role?: Maybe<Role>;
    state?: Maybe<Scalars['String']['output']>;
    subscriptionEndDate?: Maybe<Scalars['DateTime']['output']>;
    translatingFor?: Maybe<Array<Maybe<User>>>;
    translators?: Maybe<Array<Maybe<Translator>>>;
    translatorsCount?: Maybe<Scalars['Int']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AddAndCreateTranslatorMutationVariables = Exact<{
    input: AddAndCreateTranslatorInput;
}>;

export type AddAndCreateTranslatorMutation = {
    __typename?: 'Mutation';
    addAndCreateTranslator?: {
        __typename?: 'User';
        id: string;
        email: string;
        firstName?: string | null;
        lastName?: string | null;
        city?: string | null;
        state?: string | null;
        phone?: string | null;
        languages?: Array<string | null> | null;
        translatingFor?: Array<{
            __typename?: 'User';
            firstName?: string | null;
            lastName?: string | null;
            phone?: string | null;
            email: string;
        } | null> | null;
    } | null;
};

export type AddNonUserTranslatorMutationVariables = Exact<{
    input: AddNonUserTranslatorInput;
}>;

export type AddNonUserTranslatorMutation = {
    __typename?: 'Mutation';
    addNonUserTranslator?: {
        __typename?: 'Translator';
        id?: string | null;
        email?: string | null;
        phone?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        city?: string | null;
        state?: string | null;
        languages?: Array<string> | null;
    } | null;
};

export type UpdateUserMutationVariables = Exact<{
    input: CompleteProfileInput;
}>;

export type UpdateUserMutation = {
    __typename?: 'Mutation';
    completeProfile?: {
        __typename?: 'User';
        id: string;
        createdAt?: any | null;
        updatedAt?: any | null;
        email: string;
        phone?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        isManager?: boolean | null;
        isTranslator?: boolean | null;
        isBanned?: boolean | null;
        isProfileComplete?: boolean | null;
        city?: string | null;
        state?: string | null;
        languages?: Array<string | null> | null;
    } | null;
};

export type CreateAddressMutationVariables = Exact<{
    input: CreateAddressInput;
}>;

export type CreateAddressMutation = {
    __typename?: 'Mutation';
    createAddress: {
        __typename?: 'Address';
        id?: string | null;
        address1?: string | null;
        address2?: string | null;
        city?: string | null;
        state?: string | null;
        zipCode?: string | null;
    };
};

export type CreateAssignmentMutationVariables = Exact<{
    input: CreateAssignmentInput;
}>;

export type CreateAssignmentMutation = {
    __typename?: 'Mutation';
    createAssignment: {
        __typename?: 'Assignment';
        id?: string | null;
        dateTime?: any | null;
        address?: {
            __typename?: 'Address';
            id?: string | null;
            address1?: string | null;
            address2?: string | null;
            city?: string | null;
            state?: string | null;
            zipCode?: string | null;
        } | null;
        assignedTo?: { __typename?: 'Translator'; id?: string | null; firstName?: string | null; lastName?: string | null } | null;
        createdBy?: { __typename?: 'User'; id: string; firstName?: string | null; lastName?: string | null } | null;
        claimant?: { __typename?: 'Claimant'; id?: string | null; firstName?: string | null; lastName?: string | null } | null;
    };
};

export type CreateClaimantMutationVariables = Exact<{
    input: CreateClaimantInput;
}>;

export type CreateClaimantMutation = {
    __typename?: 'Mutation';
    createClaimant: {
        __typename?: 'Claimant';
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        email?: string | null;
        phone?: string | null;
        languages?: Array<string | null> | null;
    };
};

export type CreateReminderMutationVariables = Exact<{
    input: CreateReminderInput;
}>;

export type CreateReminderMutation = {
    __typename?: 'Mutation';
    createReminder: {
        __typename?: 'Reminder';
        id?: string | null;
        translatorMessage?: string | null;
        claimantMessage?: string | null;
        assignment?: {
            __typename?: 'Assignment';
            id?: string | null;
            dateTime?: any | null;
            assignedTo?: {
                __typename?: 'Translator';
                id?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                languages?: Array<string> | null;
            } | null;
            claimant?: {
                __typename?: 'Claimant';
                id?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                languages?: Array<string | null> | null;
            } | null;
        } | null;
    };
};

export type DeleteNonUserTranslatorMutationVariables = Exact<{
    input: ByIdInput;
}>;

export type DeleteNonUserTranslatorMutation = {
    __typename?: 'Mutation';
    deleteNonUserTranslator?: {
        __typename?: 'Translator';
        id?: string | null;
        email?: string | null;
        phone?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        city?: string | null;
        state?: string | null;
        languages?: Array<string> | null;
    } | null;
};

export type UpdateAddressMutationVariables = Exact<{
    input: UpdateAddressInput;
}>;

export type UpdateAddressMutation = {
    __typename?: 'Mutation';
    updateAddress: {
        __typename?: 'Address';
        id?: string | null;
        address1?: string | null;
        address2?: string | null;
        city?: string | null;
        state?: string | null;
        zipCode?: string | null;
        user?: { __typename?: 'User'; id: string; firstName?: string | null; lastName?: string | null } | null;
    };
};

export type UpdateAssignmentMutationVariables = Exact<{
    input: UpdateAssignmentInput;
}>;

export type UpdateAssignmentMutation = {
    __typename?: 'Mutation';
    updateAssignment: {
        __typename?: 'Assignment';
        id?: string | null;
        dateTime?: any | null;
        address?: {
            __typename?: 'Address';
            id?: string | null;
            address1?: string | null;
            address2?: string | null;
            city?: string | null;
            state?: string | null;
            zipCode?: string | null;
        } | null;
        assignedTo?: { __typename?: 'Translator'; id?: string | null; firstName?: string | null; lastName?: string | null } | null;
        createdBy?: { __typename?: 'User'; id: string; firstName?: string | null; lastName?: string | null } | null;
        claimant?: { __typename?: 'Claimant'; id?: string | null; firstName?: string | null; lastName?: string | null } | null;
    };
};

export type UpdateClaimantMutationVariables = Exact<{
    input: UpdateClaimantInput;
}>;

export type UpdateClaimantMutation = {
    __typename?: 'Mutation';
    updateClaimant: {
        __typename?: 'Claimant';
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        phone?: string | null;
        email?: string | null;
        languages?: Array<string | null> | null;
        user?: { __typename?: 'User'; id: string; firstName?: string | null; lastName?: string | null } | null;
    };
};

export type UpdateNonUserTranslatorMutationVariables = Exact<{
    input: UpdateNonUserTranslatorInput;
}>;

export type UpdateNonUserTranslatorMutation = {
    __typename?: 'Mutation';
    updateNonUserTranslator?: {
        __typename?: 'Translator';
        id?: string | null;
        email?: string | null;
        phone?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        city?: string | null;
        state?: string | null;
        languages?: Array<string> | null;
    } | null;
};

export type UpdateReminderMutationVariables = Exact<{
    input: UpdateReminderInput;
}>;

export type UpdateReminderMutation = {
    __typename?: 'Mutation';
    updateReminder: {
        __typename?: 'Reminder';
        id?: string | null;
        translatorMessage?: string | null;
        claimantMessage?: string | null;
        assignment?: {
            __typename?: 'Assignment';
            id?: string | null;
            dateTime?: any | null;
            assignedTo?: {
                __typename?: 'Translator';
                id?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                languages?: Array<string> | null;
            } | null;
            claimant?: {
                __typename?: 'Claimant';
                id?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                languages?: Array<string | null> | null;
            } | null;
        } | null;
    };
};

export type UpdateUserInfoMutationVariables = Exact<{
    input: UpdateUserInput;
}>;

export type UpdateUserInfoMutation = {
    __typename?: 'Mutation';
    updateUser?: {
        __typename?: 'User';
        id: string;
        email: string;
        updatedAt?: any | null;
        firstName?: string | null;
        lastName?: string | null;
        phone?: string | null;
        languages?: Array<string | null> | null;
        city?: string | null;
        state?: string | null;
        isTranslator?: boolean | null;
        isManager?: boolean | null;
        isProfileComplete?: boolean | null;
        translatingFor?: Array<{
            __typename?: 'User';
            id: string;
            firstName?: string | null;
            lastName?: string | null;
            languages?: Array<string | null> | null;
            email: string;
            phone?: string | null;
        } | null> | null;
        translators?: Array<{
            __typename?: 'Translator';
            id?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            languages?: Array<string> | null;
            email?: string | null;
            phone?: string | null;
        } | null> | null;
    } | null;
};

export type GetAddressQueryVariables = Exact<{
    input: ByIdInput;
}>;

export type GetAddressQuery = {
    __typename?: 'Query';
    getAddress: {
        __typename?: 'Address';
        id?: string | null;
        address1?: string | null;
        address2?: string | null;
        city?: string | null;
        state?: string | null;
        zipCode?: string | null;
    };
};

export type GetAddressesQueryVariables = Exact<{
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<AddressesFilter>;
}>;

export type GetAddressesQuery = {
    __typename?: 'Query';
    getAddresses: {
        __typename?: 'GetAddressesResponse';
        totalRowCount: number;
        addresses: Array<{
            __typename?: 'Address';
            id?: string | null;
            address1?: string | null;
            address2?: string | null;
            city?: string | null;
            state?: string | null;
            zipCode?: string | null;
            assignment?: Array<{
                __typename?: 'Assignment';
                id?: string | null;
                dateTime?: any | null;
                createdBy?: { __typename?: 'User'; id: string } | null;
            } | null> | null;
            user?: { __typename?: 'User'; id: string } | null;
        }>;
    };
};

export type GetAssignmentsQueryVariables = Exact<{
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<AssignmentsFilter>;
}>;

export type GetAssignmentsQuery = {
    __typename?: 'Query';
    getAssignments: {
        __typename?: 'GetAssignmentsResponse';
        totalRowCount: number;
        assignments: Array<{
            __typename?: 'Assignment';
            id?: string | null;
            dateTime?: any | null;
            isComplete?: boolean | null;
            createdAt?: any | null;
            claimantNoShow?: boolean | null;
            translatorNoShow?: boolean | null;
            address?: {
                __typename?: 'Address';
                id?: string | null;
                address1?: string | null;
                address2?: string | null;
                city?: string | null;
                state?: string | null;
                zipCode?: string | null;
            } | null;
            assignedToUser?: {
                __typename?: 'Translator';
                id?: string | null;
                email?: string | null;
                phone?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                city?: string | null;
                state?: string | null;
                languages?: Array<string> | null;
            } | null;
            createdBy?: {
                __typename?: 'User';
                id: string;
                email: string;
                phone?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                city?: string | null;
                state?: string | null;
                languages?: Array<string | null> | null;
            } | null;
            claimant?: {
                __typename?: 'Claimant';
                id?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                email?: string | null;
                phone?: string | null;
                languages?: Array<string | null> | null;
                primaryLanguage?: string | null;
            } | null;
            assignedTo?: {
                __typename?: 'Translator';
                id?: string | null;
                email?: string | null;
                phone?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                city?: string | null;
                state?: string | null;
                languages?: Array<string> | null;
            } | null;
        }>;
    };
};

export type GetClaimantQueryVariables = Exact<{
    input: ByIdInput;
}>;

export type GetClaimantQuery = {
    __typename?: 'Query';
    getClaimant: {
        __typename?: 'Claimant';
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        email?: string | null;
        phone?: string | null;
        primaryLanguage?: string | null;
        languages?: Array<string | null> | null;
    };
};

export type GetClaimantsQueryVariables = Exact<{
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<ClaimantsFilter>;
}>;

export type GetClaimantsQuery = {
    __typename?: 'Query';
    getClaimants: {
        __typename?: 'GetClaimantsResponse';
        totalRowCount: number;
        claimants: Array<{
            __typename?: 'Claimant';
            id?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            email?: string | null;
            phone?: string | null;
            primaryLanguage?: string | null;
            languages?: Array<string | null> | null;
            user?: { __typename?: 'User'; id: string } | null;
        }>;
    };
};

export type GetLanguagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetLanguagesQuery = {
    __typename?: 'Query';
    getLanguages?: Array<{ __typename?: 'Language'; name?: string | null; code?: string | null } | null> | null;
};

export type GetNonUserTranslatorQueryVariables = Exact<{
    input: ByIdInput;
}>;

export type GetNonUserTranslatorQuery = {
    __typename?: 'Query';
    getNonUserTranslator: {
        __typename?: 'Translator';
        id?: string | null;
        email?: string | null;
        phone?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        city?: string | null;
        state?: string | null;
        languages?: Array<string> | null;
    };
};

export type GetNonUserTranslatorsQueryVariables = Exact<{
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<TranslatorsFilter>;
}>;

export type GetNonUserTranslatorsQuery = {
    __typename?: 'Query';
    getNonUserTranslators: {
        __typename?: 'GetNonUserTranslatorsResponse';
        totalRowCount: number;
        translators: Array<{
            __typename?: 'Translator';
            id?: string | null;
            email?: string | null;
            phone?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            languages?: Array<string> | null;
        }>;
    };
};

export type GetReminderQueryVariables = Exact<{
    input: ByIdInput;
}>;

export type GetReminderQuery = {
    __typename?: 'Query';
    getReminder: {
        __typename?: 'Reminder';
        id?: string | null;
        translatorMessage?: string | null;
        claimantMessage?: string | null;
        assignment?: { __typename?: 'Assignment'; id?: string | null; dateTime?: any | null; createdBy?: { __typename?: 'User'; id: string } | null } | null;
        createdBy?: { __typename?: 'User'; id: string } | null;
    };
};

export type GetRemindersQueryVariables = Exact<{
    input: PaginatedInput;
}>;

export type GetRemindersQuery = {
    __typename?: 'Query';
    getReminders: {
        __typename?: 'GetRemindersResponse';
        reminders: Array<{
            __typename?: 'Reminder';
            id?: string | null;
            translatorMessage?: string | null;
            claimantMessage?: string | null;
            assignment?: {
                __typename?: 'Assignment';
                id?: string | null;
                dateTime?: any | null;
                createdBy?: { __typename?: 'User'; id: string } | null;
            } | null;
            createdBy?: { __typename?: 'User'; id: string } | null;
        }>;
    };
};

export type GetRolesQueryVariables = Exact<{ [key: string]: never }>;

export type GetRolesQuery = {
    __typename?: 'Query';
    getRoles?: Array<{
        __typename?: 'Role';
        name?: string | null;
        description?: string | null;
        features?: Array<string> | null;
        stripePriceId?: string | null;
        priceCents?: number | null;
        translatorsLimit?: number | null;
        remindersLimit?: number | null;
    } | null> | null;
};

export type GetTranslatorQueryVariables = Exact<{
    input: ByIdInput;
}>;

export type GetTranslatorQuery = {
    __typename?: 'Query';
    getTranslator: {
        __typename?: 'User';
        id: string;
        email: string;
        phone?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        city?: string | null;
        state?: string | null;
        languages?: Array<string | null> | null;
    };
};

export type GetTranslatorsQueryVariables = Exact<{
    input?: InputMaybe<PaginatedInput>;
    where?: InputMaybe<TranslatorsFilter>;
}>;

export type GetTranslatorsQuery = {
    __typename?: 'Query';
    getTranslators: {
        __typename?: 'GetTranslatorsResponse';
        totalRowCount: number;
        translators: Array<{
            __typename?: 'User';
            id: string;
            email: string;
            phone?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            languages?: Array<string | null> | null;
        }>;
    };
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
    __typename?: 'Query';
    getUser: {
        __typename?: 'User';
        id: string;
        createdAt?: any | null;
        updatedAt?: any | null;
        email: string;
        phone?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        profilePic?: string | null;
        isManager?: boolean | null;
        isTranslator?: boolean | null;
        isBanned?: boolean | null;
        isProfileComplete?: boolean | null;
        city?: string | null;
        state?: string | null;
        languages?: Array<string | null> | null;
        autoRenewSubscription?: boolean | null;
        subscriptionEndDate?: any | null;
        translatorsCount?: number | null;
        remindersCount?: number | null;
        remindersCreatedThisMonth?: number | null;
        role?: {
            __typename?: 'Role';
            name?: string | null;
            description?: string | null;
            priceCents?: number | null;
            features?: Array<string> | null;
            stripePriceId?: string | null;
            remindersLimit?: number | null;
            translatorsLimit?: number | null;
        } | null;
    };
};

export const AddAndCreateTranslatorDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'AddAndCreateTranslator' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddAndCreateTranslatorInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addAndCreateTranslator' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'translatingFor' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AddAndCreateTranslatorMutation, AddAndCreateTranslatorMutationVariables>;
export const AddNonUserTranslatorDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'addNonUserTranslator' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddNonUserTranslatorInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addNonUserTranslator' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AddNonUserTranslatorMutation, AddNonUserTranslatorMutationVariables>;
export const UpdateUserDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateUser' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CompleteProfileInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'completeProfile' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isManager' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isTranslator' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isBanned' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isProfileComplete' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateAddressDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateAddress' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateAddressInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createAddress' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateAddressMutation, CreateAddressMutationVariables>;
export const CreateAssignmentDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'createAssignment' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateAssignmentInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createAssignment' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'address' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignedTo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdBy' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'claimant' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateAssignmentMutation, CreateAssignmentMutationVariables>;
export const CreateClaimantDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateClaimant' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateClaimantInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createClaimant' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateClaimantMutation, CreateClaimantMutationVariables>;
export const CreateReminderDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'createReminder' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateReminderInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createReminder' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'translatorMessage' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'claimantMessage' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignment' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'assignedTo' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'claimant' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateReminderMutation, CreateReminderMutationVariables>;
export const DeleteNonUserTranslatorDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'deleteNonUserTranslator' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ByIdInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deleteNonUserTranslator' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DeleteNonUserTranslatorMutation, DeleteNonUserTranslatorMutationVariables>;
export const UpdateAddressDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'updateAddress' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateAddressInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateAddress' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const UpdateAssignmentDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'updateAssignment' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateAssignmentInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateAssignment' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'address' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignedTo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignedTo' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdBy' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'claimant' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>;
export const UpdateClaimantDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'updateClaimant' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateClaimantInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateClaimant' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateClaimantMutation, UpdateClaimantMutationVariables>;
export const UpdateNonUserTranslatorDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'updateNonUserTranslator' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateNonUserTranslatorInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateNonUserTranslator' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateNonUserTranslatorMutation, UpdateNonUserTranslatorMutationVariables>;
export const UpdateReminderDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'updateReminder' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateReminderInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateReminder' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'translatorMessage' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'claimantMessage' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignment' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'assignedTo' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'claimant' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateReminderMutation, UpdateReminderMutationVariables>;
export const UpdateUserInfoDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateUserInfo' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateUserInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateUser' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'translatingFor' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'translators' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                        ],
                                    },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isTranslator' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isManager' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isProfileComplete' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const GetAddressDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetAddress' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ByIdInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getAddress' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetAddressQuery, GetAddressQueryVariables>;
export const GetAddressesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetAddresses' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginatedInput' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddressesFilter' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getAddresses' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                            { kind: 'Argument', name: { kind: 'Name', value: 'where' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'totalRowCount' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'addresses' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'assignment' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'createdBy' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'user' },
                                                selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetAddressesQuery, GetAddressesQueryVariables>;
export const GetAssignmentsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetAssignments' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginatedInput' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'AssignmentsFilter' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getAssignments' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                            { kind: 'Argument', name: { kind: 'Name', value: 'where' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignments' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'address' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'assignedToUser' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'createdBy' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'claimant' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'primaryLanguage' } },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'assignedTo' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'isComplete' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'claimantNoShow' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'translatorNoShow' } },
                                        ],
                                    },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'totalRowCount' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetAssignmentsQuery, GetAssignmentsQueryVariables>;
export const GetClaimantDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'getClaimant' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ByIdInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getClaimant' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'primaryLanguage' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetClaimantQuery, GetClaimantQueryVariables>;
export const GetClaimantsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'getClaimants' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginatedInput' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'ClaimantsFilter' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getClaimants' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                            { kind: 'Argument', name: { kind: 'Name', value: 'where' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'totalRowCount' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'claimants' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'user' },
                                                selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'primaryLanguage' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetClaimantsQuery, GetClaimantsQueryVariables>;
export const GetLanguagesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetLanguages' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getLanguages' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetLanguagesQuery, GetLanguagesQueryVariables>;
export const GetNonUserTranslatorDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetNonUserTranslator' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ByIdInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getNonUserTranslator' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetNonUserTranslatorQuery, GetNonUserTranslatorQueryVariables>;
export const GetNonUserTranslatorsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetNonUserTranslators' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginatedInput' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'TranslatorsFilter' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getNonUserTranslators' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                            { kind: 'Argument', name: { kind: 'Name', value: 'where' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'totalRowCount' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'translators' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetNonUserTranslatorsQuery, GetNonUserTranslatorsQueryVariables>;
export const GetReminderDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetReminder' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ByIdInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getReminder' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'translatorMessage' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'claimantMessage' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignment' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'createdBy' },
                                                selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdBy' },
                                    selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetReminderQuery, GetReminderQueryVariables>;
export const GetRemindersDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetReminders' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginatedInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getReminders' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reminders' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'translatorMessage' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'claimantMessage' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'assignment' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'createdBy' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'createdBy' },
                                                selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetRemindersQuery, GetRemindersQueryVariables>;
export const GetRolesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetRoles' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getRoles' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'features' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'stripePriceId' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'priceCents' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'translatorsLimit' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'remindersLimit' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetRolesQuery, GetRolesQueryVariables>;
export const GetTranslatorDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetTranslator' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ByIdInput' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getTranslator' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetTranslatorQuery, GetTranslatorQueryVariables>;
export const GetTranslatorsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetTranslators' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginatedInput' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'TranslatorsFilter' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getTranslators' },
                        arguments: [
                            { kind: 'Argument', name: { kind: 'Name', value: 'input' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } } },
                            { kind: 'Argument', name: { kind: 'Name', value: 'where' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } } },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'totalRowCount' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'translators' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetTranslatorsQuery, GetTranslatorsQueryVariables>;
export const GetUserDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetUser' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getUser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'profilePic' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isManager' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isTranslator' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isBanned' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'isProfileComplete' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'languages' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'autoRenewSubscription' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'subscriptionEndDate' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'translatorsCount' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'remindersCount' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'remindersCreatedThisMonth' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'role' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'priceCents' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'features' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'stripePriceId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'remindersLimit' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'translatorsLimit' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
